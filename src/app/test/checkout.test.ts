import { CartItem } from "../features/cart/types/cart";
import { useYourOrdersStore } from "../features/checkout/store/orderStore";

describe('Checkout', () => {
    beforeEach(() => {
        useYourOrdersStore.getState().orders = [];
    })

    it('should create a new order', () => {
        const createOrder = useYourOrdersStore.getState().createOrder;

        const items : Partial<CartItem>[] = [
            { id: 1, title: 'Product 1', price: 10, quantity: 2 },
            { id: 2, title: 'Product 2', price: 20, quantity: 1 },
        ];

        createOrder(items as CartItem[], 40);

        const state = useYourOrdersStore.getState();

        expect(state.orders.length).toBe(1);
        expect(state.orders[0].items.length).toBe(2);
        expect(state.orders[0].total).toBe(40);
    })
})