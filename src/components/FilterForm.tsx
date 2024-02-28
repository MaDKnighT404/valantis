import { FormEvent, useState } from 'react';

export const FilterForm = () => {
  const [filter, setFilter] = useState({
    product: '',
    price: 0,
    brand: '',
  });

  const handleFilterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(filter);
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
          value={filter.product}
          className="flex-1 rounded border border-gray-300 p-2"
          onChange={(e) => setFilter({ ...filter, product: e.target.value })}
        />
      </label>
      <label className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <span className="min-w-[120px]">Max Price:</span>
        <input
          type="number"
          placeholder="5000"
          value={filter.price || ''}
          className="flex-1 rounded border border-gray-300 p-2"
          onChange={(e) =>
            setFilter({
              ...filter,
              price: e.target.value ? parseInt(e.target.value, 10) : 0,
            })
          }
        />
      </label>
      <label className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <span className="min-w-[120px]">Brand:</span>
        <input
          type="text"
          placeholder="Piaget"
          value={filter.brand}
          className="flex-1 rounded border border-gray-300 p-2"
          onChange={(e) => setFilter({ ...filter, brand: e.target.value })}
        />
      </label>
      <button
        type="submit"
        className="mt-4 rounded bg-teal-600 px-4 py-2 font-semibold text-white hover:bg-teal-700">
        Apply Filters
      </button>
    </form>
  );
};
