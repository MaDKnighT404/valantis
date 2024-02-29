import { useProductStore } from '../store';

export const PageSelector = () => {
  const { page, increasePage, decreasePage } = useProductStore((state) => ({
    page: state.page,
    increasePage: state.increasePage,
    decreasePage: state.decreasePage,
  }));

  const isLoading = useProductStore((state) => state.isLoading);

  return (
    <div className="my-5 flex items-center justify-center gap-10 text-2xl text-teal-700">
      <button
        className="rounded bg-teal-600 px-3 py-1 font-semibold text-white hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 disabled:hover:text-white"
        onClick={decreasePage}
        disabled={page === 1 || isLoading}>
        Prev
      </button>

      <span className="flex gap-2 text-zinc-600">
        Page: <span className="text-orange-500">{page}</span>
      </span>

      <button
        className="rounded bg-teal-600 px-3 py-1 font-semibold text-white hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 disabled:hover:text-white"
        disabled={isLoading}
        onClick={increasePage}>
        Next
      </button>
    </div>
  );
};
