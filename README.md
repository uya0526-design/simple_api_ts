# シンプル自作API呼び出し CLI / Simple custum API call CLI

![TypeScript](https://img.shields.io/badge/TypeScript-6.x-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/Tested_with-Jest-C21325?logo=jest&logoColor=white)
![License](https://img.shields.io/badge/License-ISC-blue)

TypeScript で作ったシンプルな自作API呼び出しの CLI ツールです。  
This is a simple CLI tool for calling custum APIs, written in TypeScript.

---

## 概要 / Overview

自作のAPI呼び出しができる CLI ツールです。アイテムの一覧の取得、IDを指定してのアイテムの取得、アイテムの追加ができます。  
This is a CLI tool that allows you to make custom API calls. You can get a list of items, get item by specifying their ID, and add item.

自作FastAPIとの連携 を中心に実装しています。  
The implementation primarily focuses on integration with a custom-built FastAPI.

---

## 機能 / Features

| # | 機能 | Description |
|---|------|-------------|
| 1 | アイテムの一覧を取得 | Get items |
| 2 | IDを指定してアイテムを取得 | Get item by specifying their ID |
| 3 | アイテムを追加 | Add item |
| 4 | 終了 | Exit the tool |

---

## 技術スタック / Tech Stack

| | |
|---|---|
| Language | TypeScript |
| Runtime | Node.js |
| Test Framework | Jest + ts-jest |
| Module System | CommonJS (NodeNext resolution) |

---

## フォルダ構成 / Project Structure

```
simple_api_ts/
├── src/
│   ├── index.ts             # エントリポイント / Entry point
│   ├── api.ts               # API操作ロジック / Business logic
│   ├── types.ts             # 型定義 / Type definitions
│   └── __tests__/
│       └── api.test.ts     # ユニットテスト / Unit tests
├── jest.config.js
├── tsconfig.json
├── package.json
├── README.md
└── LEARNING_LOG.md
```

---

## セットアップ / Getting Started

### 必要環境 / Prerequisites

- Node.js v18+
- npm v9+

### インストール / Install

> ⚠️ 本ツールは以下のリポジトリと連携することを前提としています。
> https://github.com/your-username/simple_api_py.git

```bash
git clone https://github.com/uya0526-design/simple_api_ts.git
cd simple_api_ts
npm install
```

### 起動 / Run

> ⚠️ ツール内の処理の実行にはFastAPIサーバーの起動が必要です。

```bash
npm start
```

### テスト / Test

> ⚠️ テストの実施にはFastAPIサーバーの起動が必要です。

```bash
npm test
```

---

## 実行例 / Example

FastAPIサーバーのエンドポイントは以下の通りです。
- GET  /items          → アイテム一覧を返す
- GET  /items/{id}     → 特定のアイテムを返す（存在しない場合は404）
- POST /items          → アイテムを追加する（idはサーバー側で自動採番）

```
自作API呼び出し CLI tool
================================
1. アイテムの一覧を取得
2. IDを指定してアイテムを取得
3. アイテムを追加
4. 終了
================================
選択してください: 1
[
  { id: 1, name: 'apple', price: 100 },
  { id: 2, name: 'banana', price: 200 },
  { id: 3, name: 'cherry', price: 300 }
]
```

---

## テスト結果 / Test Results

```
 PASS  src/__tests__/api.test.ts
                                                                                                                
Test Suites: 1 passed, 1 total                                                                                  
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        0.248 s, estimated 1 s
```

---

## 型設計 / Type Design

レスポンスのデータ構造は以下の通りです。
{ "id": number, "name": string, "price": number }

```typescript
export interface Item {
    id: number;
    name: string;
    price: number;
}
export interface ItemCreate {
    // idはサーバー側で自動採番される
    name: string;
    price: number;
}
```

---

## License

[ISC](https://opensource.org/licenses/ISC)
