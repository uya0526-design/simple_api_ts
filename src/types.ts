// --- types.ts ---

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
