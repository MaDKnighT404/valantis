import { create } from 'zustand';

export interface ProductsFilter {
  product: string;
  price: number;
  brand: string;
}

interface ProductsStore {
  page: number;
  setPage: (value: number) => void;

  filterPage: number;
  setFilterPage: (value: number) => void;

  totalFilteredPages: number;
  setTotalFilteredPages: (pages: number) => void;

  isLoading: boolean;
  setIsLoading: (status: boolean) => void;

  productsFilter: ProductsFilter;
  setProductsFilter: (newFilter: Partial<ProductsFilter>) => void;

  filteredItemIds: string[];
  setFilteredItemIds: (ids: string[]) => void;

  isFilterActive: boolean;
  setIsFilterActive: (status: boolean) => void;
}

export const useProductStore = create<ProductsStore>((set) => ({
  page: 1,
  setPage: (newValue) => set({ page: newValue }),

  filterPage: 1,
  setFilterPage: (newValue) => set({ filterPage: newValue }),

  totalFilteredPages: 0,
  setTotalFilteredPages: (pages) => set(() => ({ totalFilteredPages: pages })),

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

  filteredItemIds: [],
  setFilteredItemIds: (ids: string[]) => set({ filteredItemIds: ids }),

  isFilterActive: false,
  setIsFilterActive: (status) => set({ isFilterActive: status }),
}));
