export const PageSelector = ({
  page,
  setPage,
  loading,
}: {
  page: number;
  setPage: (page: number | ((prevPage: number) => number)) => void;
  loading: boolean;
}) => {
  return (
    <div className="my-5 flex items-center justify-center gap-10 text-2xl text-teal-700">
      <button
        className="rounded bg-teal-600 px-3 py-1 font-semibold text-white hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 disabled:hover:text-white"
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1 || loading}>
        Prev
      </button>

      <span className="flex gap-2 text-zinc-600">
        Page: <span className="text-orange-500">{page}</span>
      </span>

      <button
        className="rounded bg-teal-600 px-3 py-1 font-semibold text-white hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 disabled:hover:text-white"
        disabled={loading}
        onClick={() => setPage((prev) => prev + 1)}>
        Next
      </button>
    </div>
  );
};
