import { Item} from "./item";

export type CartItem = Item & {
    quantity: number;
}

export type CartStore = {
    items: CartItem[];
    addToCart: (item: Item) => void;
    removeFromCart: (itemId: number) => void;
    increaseQuantity: (itemId: number) => void;
    decreaseQuantity: (itemId: number) => void;
    clearCart: () => void;
}