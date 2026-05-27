// --- api.test.ts ---

import { describe, test, expect, beforeEach, afterEach, jest } from "@jest/globals";
import { getItems, getItemById, createItem } from "../api";
import { Item, ItemCreate } from "../types";

describe("getItems", () => {
    afterEach (() => {
        jest.restoreAllMocks();
    });
    // アイテムの一覧が取得できること
    test("アイテムの一覧が取得できること", async () => {
        // アイテムを1つ追加
        await createItem({ name: "Item 1", price: 100 });
        const items = await getItems();
        expect(items.length).toBeGreaterThan(0);
        expect(items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                price: expect.any(Number),
            }),
        ]));
    });
    // アイテムの一覧が取得できないときエラーとなること
    test("アイテムの一覧が取得できないときエラーとなること", async () => {
        jest.spyOn(global, "fetch").mockRejectedValue(new Error("API error"));
        await expect(getItems()).rejects.toThrow("API error");
    });
});

describe("getItemById", () => {
    afterEach (() => {
        jest.restoreAllMocks();
    });
    // IDを指定してアイテムが取得できること
    test("IDを指定してアイテムが取得できること", async () => {
        const item = await getItemById(1);
        expect(item).toMatchObject({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
        });
    });
    // IDを指定してアイテムが取得できないときエラーとなること
    test("IDを指定してアイテムが取得できないときエラーとなること", async () => {
        jest.spyOn(global, "fetch").mockRejectedValue(new Error("API error"));
        await expect(getItemById(1)).rejects.toThrow("API error");
    });
});

describe("createItem", () => {
    afterEach (() => {
        jest.restoreAllMocks();
    });
    // アイテムを追加できること
    test("アイテムを追加できること", async () => {
        const item = await createItem({ name: "Item 1", price: 100 });
        expect(item).toMatchObject({
            id: expect.any(Number),
            name: "Item 1",
            price: 100,
        });
    });
    // アイテムを追加できないときエラーとなること
    test("アイテムを追加できないときエラーとなること", async () => {
        jest.spyOn(global, "fetch").mockRejectedValue(new Error("API error"));
        await expect(createItem({ name: "Item 1", price: 100 })).rejects.toThrow("API error");
    });
    // アイテムを1件追加した際、アイテムの一覧の件数が1件増えていること
    test("アイテムを1件追加した際、アイテムの一覧の件数が1件増えていること", async () => {
        const beforeItems = await getItems();
        const item = await createItem({ name: "Item 1", price: 100 });
        const afterItems = await getItems();
        expect(afterItems.length).toBe(beforeItems.length + 1);
    });
});
