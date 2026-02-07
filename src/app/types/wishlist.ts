import { Item } from "./item";

export type WishlistStore = {
        items: Item[];
        addToWishlist: (item: Item) => void;
        removeFromWishlist: (itemId: number) => void;
        clearWishlist: () => void;
        addAllToCart: () => void;
}