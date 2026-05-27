# Learning Log - simple_api_ts

## 開発概要

TypeScript製HTTPクライアントCLIの実装。
PythonのFastAPIサーバー（simple_api）を叩くためのCLIツール。

---

## 自分で実装した部分

### ファイル構成の設計
- `types.ts` / `api.ts` / `index.ts` の3ファイルへの責務分離
- `ItemCreate` インターフェースから `id` を除外（サーバー側で自動採番されるため）

### api.ts
- `fetch` を使った GET / POST リクエストの実装
- `!response.ok` によるHTTPエラー検知と `throw`
- POST時の `Content-Type: application/json` ヘッダー指定（422エラーのバグを自力で特定・修正）

### index.ts
- `readline` を使った対話型CLIの実装
- `while(true)` + `switch` によるメニューループ
- `isNaN(parseInt(id))` による入力バリデーション
- `async/await` の応用

### api.test.ts
- Jestによるテストの実装（成功系・失敗系）
- `jest.spyOn` + `mockRejectedValue` によるfetchのモック
- `afterEach` での `jest.restoreAllMocks()` によるモック復元
- 件数増加確認テスト（追加前後でlengthを比較）

---

## AIのフィードバックをもとに修正した部分

| # | 修正内容 | 修正前 | 修正後 |
|---|---|---|---|
| 1 | 404エラー時にプログラムが終了する問題 | `case "2"` にtry-catchなし → `main().catch()` まで伝わり終了 | `case "2"` 内に `try-catch` を追加しループを継続 |
| 2 | エラーメッセージの出し分け | 404でも「無効なIDです」と表示 | `error.message.includes("404")` で「アイテムが見つかりません」と出し分け |
| 3 | 不明エラー時の終了方法 | `return` でmainを正常終了（エラー詳細が出ない） | `console.error(error)` + `throw error` でmain().catchに委譲 |
| 4 | ベースURLのハードコード | 3関数それぞれに `"http://localhost:8000"` | `const API_ENDPOINT` として1か所にまとめ |
| 5 | createItemのbodyの冗長な記述 | `{ name: inputItem.name, price: inputItem.price }` | `JSON.stringify(inputItem)` に簡略化 |
| 6 | interfaceの末尾セミコロン | `};` | `}` |

---

## 学んだこと

### バグ対応
- **422エラーの原因**：FastAPIはリクエストボディをJSONとして解釈するために `Content-Type: application/json` ヘッダーが必要。ないと422（Unprocessable Entity）が返る。

### エラーハンドリング
- **try-catchの配置**：`throw` したエラーをどこでcatchするかで、プログラムの挙動（継続 or 終了）が変わる。
- **`error instanceof Error`**：TypeScriptでは `catch` の `error` は `unknown` 型なので、`.message` を使う前に型確認が必要。
- **`return` vs `throw error`**：`return` はmainを正常終了させるだけ。`throw error` で再スローすると `main().catch()` に伝わり `process.exit(1)` で終了できる。Javaの `throws` に近い感覚。

### TypeScriptの型活用
- **`JSON.stringify(inputItem)`**：`ItemCreate` 型で `name` と `price` しか持たないことが保証されているため、フィールドを展開して書き直す必要はない。型でコードを簡潔にできる。

### テスト設計
- **単体テスト vs 統合テスト**：mockで完結するテストは「単体テスト」、実際のAPIサーバーが必要なテストは「統合テスト」。同じdescribeに混在することも多いが、規模が大きくなったらファイルを分けると管理しやすい（`unit/` / `integration/`）。
- **describeの分け方**：関数単位・テスト種別・シナリオ（BDD）などがある。現時点では関数単位で問題ない。

### npm / コマンド
- **`npm test -- --testPathPattern=unit`**：`--` は「以降の引数をnpmではなくjestに渡す」区切り記号。`package.json` の `"test": "jest"` があるため、`npm test -- [jestオプション]` = `jest [jestオプション]` と同じ。

### TypeScript構文
- **`interface` の閉じ括弧**：`};` ではなく `}` が正しい。`class` や `function` との違いに注意。
- **プロパティの `;`**：interfaceのプロパティ末尾の `;` はあってもなくても動作するが、TypeScriptの慣例では書くのが一般的。

---

## 遭遇したバグ

### 422エラー（POST /items）
- **現象**：アイテム追加時に422エラーが発生
- **原因**：`Content-Type: application/json` ヘッダーがなく、FastAPIがリクエストボディをJSONとして解釈できなかった
- **解決**：`headers: { "Content-Type": "application/json" }` を追加

### プログラムの意図しない終了（404エラー時）
- **現象**：存在しないIDを入力するとCLIが終了してしまう
- **原因**：`getItemById` の `throw` が `switch` 内でcatchされず、`main().catch()` まで伝わっていた
- **解決**：`case "2"` 内に `try-catch` を追加してエラーをハンドリング
