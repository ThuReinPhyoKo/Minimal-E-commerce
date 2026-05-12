import { useProductStore } from '../features/products/store/productStore';
import { Product } from '../features/products/types/wholeProduct';

describe('Admin Product CRUD', () => {
    beforeEach(() => {
        useProductStore.getState().catalog = {};
    })

    it('should CREATE a new producct', () => {
        const addProduct = useProductStore.getState().addProduct;

        const newProduct: Partial<Product> ={
            title: 'New Product',
            isNew: true,
            isCustom: true,
        }

        addProduct(newProduct as Product);

        const state = useProductStore.getState();

        expect(Object.values(state.catalog).length).toBe(1);
        expect(Object.values(state.catalog)[0].isNew).toBe(true);
        expect(Object.values(state.catalog)[0].isCustom).toBe(true);
        expect(Object.values(state.catalog)[0].title).toBe('New Product');
    })

    it('should READ the product catalog', () => {
        const hydrateCatalog = useProductStore.getState().hydrateCatalog;

        const product: Partial<Product> ={
            title: 'product',
        }

        hydrateCatalog([product as Product]);

        const state = useProductStore.getState();

        expect(Object.values(state.catalog).length).toBe(1);
        expect(Object.values(state.catalog)[0].title).toBe('product');
    })

    it('should UPDATE an existing product', () => {
        const editProduct = useProductStore.getState().editProduct;

        const product: Partial<Product> = {
            title: 'edited product',
            isCustom: true,
        }

        editProduct(product as Product);

        const state = useProductStore.getState();

        expect(Object.values(state.catalog)[0].isCustom).toBe(true);
        expect(Object.values(state.catalog)[0].title).toBe('edited product');
    })

    it('should DELETE an existing product', () => {
        const deleteProduct = useProductStore.getState().deleteProduct;

        const product: Partial<Product> = {
            title: 'product'
        }

        deleteProduct(product as Product);

        const state = useProductStore.getState();

        expect(Object.values(state.catalog).length).toBe(0);
        expect(state.deletedIds?.length).toBe(1);
     })
})