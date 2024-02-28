import { useQuery } from 'react-query';
import { fetchIds, fetchItems } from '../api/api';
import { useState } from 'react';
import { Spinner } from './Spinner';
import { cn } from '../utils/cn';

export const ItemsList = () => {
  const [page, setPage] = useState(1);

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

  return (
    <div className="my-4 flex flex-col justify-center px-4 text-sm">
      <div className="flex min-h-[750px] items-center justify-center">
        {loading ? (
          <Spinner className="h-32 w-32 text-teal-600" />
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {!!items &&
              items.map((item, i) => (
                <div
                  key={item.id}
                  className="w-1/5">
                  {i + 1}. {item.product} - {item.price}
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-center gap-10 text-3xl text-teal-700 ">
        <button
          className={cn(
            'rounded-lg border bg-zinc-300 px-3 py-1 transition-colors hover:bg-teal-600 hover:text-white disabled:opacity-50 disabled:hover:bg-zinc-300 disabled:hover:text-teal-800',
            {
              'opacity-50': page === 1,
            },
          )}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || loading}>
          Prev
        </button>

        <span
          className={cn('flex gap-2 text-zinc-600', {
            'opacity-80': loading,
          })}>
          Page: <span className="text-orange-500">{page}</span>
        </span>
        <button
          className="rounded-lg border bg-zinc-300 px-3 py-1 transition-colors hover:bg-teal-600 hover:text-white  disabled:opacity-50 disabled:hover:bg-zinc-300 disabled:hover:text-teal-800"
          disabled={loading}
          onClick={() => setPage((prev) => prev + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};
