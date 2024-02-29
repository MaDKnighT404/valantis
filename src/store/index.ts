import { create } from 'zustand';

interface ProductFilter {
  product: string;
  price: number | null;
  brand: string;
}

interface ProductStore {
  page: number;
  increasePage: () => void;
  decreasePage: () => void;
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;

  productFilter: ProductFilter;
  setFilter: (newFilter: Partial<ProductFilter>) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  page: 1,
  increasePage: () => set((state) => ({ page: state.page + 1 })),
  decreasePage: () => set((state) => ({ page: Math.max(state.page - 1, 1) })),

  isLoading: false,
  setIsLoading: (status) => set({ isLoading: status }),

  productFilter: {
    product: '',
    price: null,
    brand: '',
  },
  setFilter: (newFilter) =>
    set((state) => ({
      productFilter: { ...state.productFilter, ...newFilter },
    })),
}));
