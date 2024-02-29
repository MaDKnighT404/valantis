import { create } from 'zustand';

export interface ProductsFilter {
  product: string;
  price: number;
  brand: string;
}

interface ProductsStore {
  page: number;
  increasePage: () => void;
  decreasePage: () => void;
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;

  productsFilter: ProductsFilter;
  setProductsFilter: (newFilter: Partial<ProductsFilter>) => void;
}

export const useProductStore = create<ProductsStore>((set) => ({
  page: 1,
  increasePage: () => set((state) => ({ page: state.page + 1 })),
  decreasePage: () => set((state) => ({ page: Math.max(state.page - 1, 1) })),

  isLoading: false,
  setIsLoading: (status) => set({ isLoading: status }),

  productsFilter: {
    product: '',
    price: 0,
    brand: '',
  },
  setProductsFilter: (newProductFilter) =>
    set((state) => ({
      productsFilter: { ...state.productsFilter, ...newProductFilter },
    })),
}));
