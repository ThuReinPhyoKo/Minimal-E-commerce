import { useCartStore } from "../features/cart/store/cartStore";

describe('Cart Store', () => {
    beforeEach(() => {
        useCartStore.getState().clearCart();
    })

    it('should add item to cart', () => {
        const addToCart = useCartStore.getState().addToCart;

        const item = { id: 1, title: 'Product 1', price: 10, discountPercentage: 0, thumbnail: "thumbnail.jpg" };

        addToCart(item);

        const state = useCartStore.getState();
        
        expect(state.items.length).toBe(1);
        expect(state.items[0].price).toBe(10);
        expect(state.items[0].quantity).toBe(1);
    })

    it('should increase quantity if item is already in cart', () => {
        const addToCart = useCartStore.getState().addToCart;

        const item = { id: 1, title: 'Product 1', price: 10, discountPercentage: 0, thumbnail: "thumbnail.jpg" };

        addToCart(item);
        addToCart(item);

        const state = useCartStore.getState();
        
        expect(state.items.length).toBe(1);
        expect(state.items[0].quantity).toBe(2);
    })

    it('should add mutliple different items to cart', () => {
        const addToCart = useCartStore.getState().addToCart;

        const item1 = { id: 1, title: 'Product 1', price: 10, discountPercentage: 0, thumbnail: "thumbnail.jpg" };
        const item2 = { id: 2, title: 'Product 2', price: 20, discountPercentage: 0, thumbnail: "thumbnail.jpg" };

        addToCart(item1);
        addToCart(item2);

        const state = useCartStore.getState();
        
        expect(state.items.length).toBe(2);
        expect(state.items.find(item => item.id === 1)?.price).toBe(10);
        expect(state.items.find(item => item.id === 2)?.price).toBe(20);
    })

    it('should remove item from cart', () => {
        const { addToCart, removeFromCart } = useCartStore.getState();

        const item = { id: 1, title: 'Product 1', price: 10, discountPercentage: 0, thumbnail: "thumbnail.jpg" };

        addToCart(item);
        removeFromCart(1);

        const state = useCartStore.getState();

        expect(state.items.length).toBe(0);
    })

    it('should calculate total price correctly', () => {
        const addToCart = useCartStore.getState().addToCart;

        const item = { id: 1, title: 'Product 1', price: 10, discountPercentage: 0, thumbnail: "thumbnail.jpg" };

        addToCart(item);
        addToCart(item);

        const state = useCartStore.getState();
        const totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        expect(totalPrice).toBe(20);
    })
})