// --- index.ts ---

import * as readline from "readline";

import { getItems, getItemById, createItem } from "./api";

function askQuestion(query: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question(query, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
}

async function main() {
    console.log("自作API呼び出し CLI tool");
    while (true) {
        console.log("================================");
        console.log("1. アイテムの一覧を取得");
        console.log("2. IDを指定してアイテムを取得");
        console.log("3. アイテムを追加");
        console.log("4. 終了");
        console.log("================================");
        const choice = await askQuestion("選択してください: ");
        switch (choice) {
            case "1": {
                const items = await getItems();
                console.log(items);
                break;
            }
            case "2": {
                const id = await askQuestion("IDを入力してください: ");
                if (isNaN(parseInt(id))) {
                    console.log("無効なIDです");
                    continue;
                }
                try {
                    const item = await getItemById(parseInt(id));
                    console.log(item);
                } catch (error) {
                    if (error instanceof Error && error.message.includes("404")) {
                        console.log("アイテムが見つかりません");
                    } else {
                        console.log("不明なエラーが発生しました");
                        console.error(error);
                        throw error;
                    }
                }
                break;
            }
            case "3": {
                const name = await askQuestion("名前を入力してください: ");
                const price = await askQuestion("価格を入力してください: ");
                if (isNaN(parseInt(price))) {
                    console.log("無効な価格です");
                    continue;
                }
                const item = await createItem({ name, price: parseInt(price) });
                console.log(item);
                break;
            }
            case "4":
                console.log("終了します");
                process.exit(0);
            default:
                console.log("無効な選択です");
                break;
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
