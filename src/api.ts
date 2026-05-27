// --- api.ts ---

import { Item, ItemCreate } from "./types";

// APIのエンドポイントを定義
const API_ENDPOINT = "http://localhost:8000";

// アイテムの一覧を取得
export const getItems = async (): Promise<Item[]> => {
    const response = await fetch(`${API_ENDPOINT}/items`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// IDを指定してアイテムを取得
export const getItemById = async (id: number): Promise<Item> => {
    const response = await fetch(`${API_ENDPOINT}/items/${id}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

// アイテムを追加
export const createItem = async (inputItem: ItemCreate): Promise<Item> => {
    const response = await fetch(`${API_ENDPOINT}/items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(inputItem),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
