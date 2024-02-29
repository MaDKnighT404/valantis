import { useQuery } from 'react-query';
import { fetchIds, fetchItems } from '../api/api';

import { Spinner } from './Spinner';
import { PageSelector } from './PageSelector';
import { useProductStore } from '../store';
import { useEffect } from 'react';

export const ProductsList = () => {
  const page = useProductStore((state) => state.page);
  const setIsLoading = useProductStore((state) => state.setIsLoading);

  const { data: itemIds, isLoading: isLoadingIds } = useQuery(
    ['itemIds', page],
    () => fetchIds(page),
    {},
  );
  const { data: items, isLoading: isLoadingItems } = useQuery(
    ['items', itemIds],
    () => fetchItems(itemIds || []),
    {
      enabled: !!itemIds,
    },
  );
  const loading = isLoadingItems || isLoadingIds;

  useEffect(() => {
    setIsLoading(loading);
  }, [loading, setIsLoading]);

  return (
    <div className="flex flex-col justify-center px-4 py-5 text-sm">
      <PageSelector />
      <div className="flex min-h-[650px] items-center justify-center">
        {loading ? (
          <Spinner className="h-32 w-32 text-teal-600" />
        ) : (
          <ul className="grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-5">
            {!!items &&
              items.map((item, i) => (
                <li
                  key={item.id}
                  className="flex min-h-[200px] cursor-pointer flex-col rounded-lg bg-white p-4 shadow transition-shadow duration-300 hover:shadow-xl">
                  <span className="text-lg font-semibold">{item.product}</span>
                  <span className="mt-2 text-gray-600">
                    Price: ${item.price}
                  </span>
                  <span className="text-gray-500">
                    {item.brand || 'No Brand'}
                  </span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};
