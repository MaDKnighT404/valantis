import { useQuery } from 'react-query';
import { fetchIds, fetchItems } from '../api/api';
import { Spinner } from './Spinner';
import { useProductStore } from '../store';
import { useEffect } from 'react';

export const ProductsList = () => {
  const { page, setIsLoading } = useProductStore((state) => ({
    page: state.page,
    setIsLoading: state.setIsLoading,
  }));

  // получаем все Id от 1 до page * 50
  const { data: itemIds, isLoading: isLoadingIds } = useQuery(
    ['itemIds', page],
    () => fetchIds(page),
    {},
  );

  // когда наберется 50 уникальных элементов в itemIds
  // делаем запрос для получения товаров
  // внутри fetchItems фильтруем их, чтобы все товары были уникальными
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
    <div className="flex min-h-[600px] justify-center py-6">
      {loading ? (
        <Spinner className="h-32 w-32 self-center text-teal-600" />
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 px-4">
          {!!items &&
            items.map((item, i) => (
              <li
                key={item.id}
                className="flex h-[200px] cursor-pointer flex-col rounded-lg bg-white p-4 shadow transition-shadow duration-300 hover:shadow-xl">
                <span className="text-lg font-semibold">{item.product}</span>
                <span className="mt-2 text-gray-600">Price: ${item.price}</span>
                <span className="text-gray-500">
                  {item.brand || 'No Brand'}
                </span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
