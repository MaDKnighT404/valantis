import { FormEvent } from 'react';
import { ProductsFilter, useProductStore } from '../store';
import { useMutation } from 'react-query';
import { filterItems } from '../api/api';

export const ProductsFilterForm = () => {
  const { isLoading, productsFilter, setProductsFilter } = useProductStore(
    (state) => ({
      isLoading: state.isLoading,
      productsFilter: state.productsFilter,
      setProductsFilter: state.setProductsFilter,
    }),
  );

  const { mutate: applyFilter, isLoading: isFiltering } = useMutation(
    filterItems,
    {
      onSuccess: (data) => {
        console.log('Результат фильтрации:', data);
      },
      onError: (error) => {
        console.error('Ошибка при фильтрации:', error);
      },
    },
  );

  const handleChange = (
    field: keyof ProductsFilter,
    value: string | number,
  ) => {
    setProductsFilter({ ...productsFilter, [field]: value });
  };

  const handleFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    applyFilter(productsFilter);
  };

  return (
    <form
      onSubmit={handleFilterSubmit}
      className="mx-auto my-8 flex max-w-md flex-col gap-4 rounded-lg bg-white p-4 shadow-md">
      <label className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <span className="min-w-[120px]">Product name:</span>
        <input
          type="text"
          placeholder="Золотое кольцо"
          value={productsFilter.product}
          className="flex-1 rounded border border-gray-300 p-2"
          onChange={(e) => handleChange('product', e.target.value)}
        />
      </label>
      <label className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <span className="min-w-[120px]">Max Price:</span>
        <input
          type="number"
          placeholder="5000"
          value={productsFilter.price || ''}
          className="flex-1 rounded border border-gray-300 p-2"
          onChange={(e) =>
            handleChange(
              'price',
              e.target.value ? parseInt(e.target.value, 10) : 0,
            )
          }
        />
      </label>
      <label className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <span className="min-w-[120px]">Brand:</span>
        <input
          type="text"
          placeholder="Piaget"
          value={productsFilter.brand}
          className="flex-1 rounded border border-gray-300 p-2"
          onChange={(e) => handleChange('brand', e.target.value)}
        />
      </label>
      <button
        type="submit"
        disabled={isLoading || isFiltering}
        className="mt-4 rounded bg-teal-600 px-3 py-1 font-semibold text-white hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 disabled:hover:text-white">
        Apply Filters
      </button>
    </form>
  );
};
