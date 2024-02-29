import { useQuery } from 'react-query';
import { fetchItems } from '../api/api';
import { useProductStore } from '../store';
import { Spinner } from './Spinner';
import { useEffect } from 'react';

const ITEMS_PER_PAGE = 50;

export const FilteredProductsList = () => {
  const { filteredItemIds, filterPage, setTotalFilteredPages } =
    useProductStore((state) => ({
      filteredItemIds: state.filteredItemIds,
      filterPage: state.filterPage,
      setTotalFilteredPages: state.setTotalFilteredPages,
    }));

  // Вычисляем индексы для текущей страницы
  const startIndex = (filterPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPageItemIds = filteredItemIds.slice(startIndex, endIndex);

  const { data: items, isLoading } = useQuery(
    ['filteredItems', filterPage, filteredItemIds],
    () => fetchItems(currentPageItemIds),
    {
      enabled: !!currentPageItemIds.length,
    },
  );

  useEffect(() => {
    // Рассчитываем общее количество страниц для отфильтрованных товаров
    const totalPages = Math.ceil(filteredItemIds.length / ITEMS_PER_PAGE);
    setTotalFilteredPages(totalPages);
  }, [filteredItemIds, setTotalFilteredPages]);

  return (
    <div className="flex min-h-[650px] justify-center py-6">
      {isLoading ? (
        <Spinner className="h-32 w-32 self-center text-teal-600" />
      ) : (
        <div>
          <h2>Найдено товаров:{filteredItemIds?.length}</h2>
          <ul className="grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-5">
            {!!items &&
              items.map((item) => (
                <li
                  key={item.id}
                  className="flex h-[200px] cursor-pointer flex-col rounded-lg bg-white p-4 shadow transition-shadow duration-300 hover:shadow-xl">
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
        </div>
      )}
    </div>
  );
};
