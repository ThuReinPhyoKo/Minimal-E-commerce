import { useWishlistStore } from "../features/wishlist/store/wishlistStore";
import { useCartStore } from "../features/cart/store/cartStore";

describe('Wishlist Store', () => {
    beforeEach(() => {
        useWishlistStore.getState().clearWishlist();
    })

    it('should add item to wishlist', () => {
        const addToWishlist = useWishlistStore.getState().addToWishlist;

        const item = { id: 1, title: 'Product 1', price: 10, discountPercentage: 0, thumbnail: "thumbnail.jpg" };

        addToWishlist(item);

        const state = useWishlistStore.getState();
        
        expect(state.items.length).toBe(1);
    })

    it('should add mutliple different items to wishlist', () => {
        const addToWishlist = useWishlistStore.getState().addToWishlist;

        const item1 = { id: 1, title: 'Product 1', price: 10, discountPercentage: 0, thumbnail: "thumbnail.jpg" };
        const item2 = { id: 2, title: 'Product 2', price: 20, discountPercentage: 0, thumbnail: "thumbnail.jpg" };

        addToWishlist(item1);
        addToWishlist(item2);

        const state = useWishlistStore.getState();
        
        expect(state.items.length).toBe(2);
        expect(state.items.find(item => item.id === 1)?.price).toBe(10);
        expect(state.items.find(item => item.id === 2)?.price).toBe(20);
    })

    it('should remove item from wishlist', () => {
        const { addToWishlist, removeFromWishlist } = useWishlistStore.getState();

        const item = { id: 1, title: 'Product 1', price: 10, discountPercentage: 0, thumbnail: "thumbnail.jpg" };

        addToWishlist(item);
        removeFromWishlist(1);

        const state = useWishlistStore.getState();

        expect(state.items.length).toBe(0);
    })

    it('should add all items from wishlist to cart', () => {
        const { addToWishlist, addAllToCart } = useWishlistStore.getState();
        
        const item1 = { id: 1, title: 'Product 1', price: 10, discountPercentage: 0, thumbnail: "thumbnail.jpg" };
        const item2 = { id: 2, title: 'Product 2', price: 20, discountPercentage: 0, thumbnail: "thumbnail.jpg" };

        addToWishlist(item1);
        addToWishlist(item2);
        addAllToCart();

        const cartState = useCartStore.getState();
        expect(cartState.items.length).toBe(2);
        expect(cartState.items.find(item => item.id === 1)?.price).toBe(10);
        expect(cartState.items.find(item => item.id === 2)?.price).toBe(20);
        expect(cartState.items.find(item => item.id === 1)?.quantity).toBe(1);
        expect(cartState.items.find(item => item.id === 2)?.quantity).toBe(1);
    })
})