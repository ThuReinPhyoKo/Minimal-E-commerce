import { CartItem } from "./cart";

export type orderStatus = 'Shipped';

export type order = {
    id: string;
    items: CartItem[];
    total: number;
    createdAt: string;
    status: orderStatus;
}

export type orderStore = {
    orders: order[];
    createOrder: (items: CartItem[], total: number) => void;
}