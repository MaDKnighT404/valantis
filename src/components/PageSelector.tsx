// Переключатель страниц
import { useProductStore } from '../store';

export const PageSelector = () => {
  const {
    page,
    setPage,
    isLoading,
    filterPage,
    isFilterActive,
    setFilterPage,
    totalFilteredPages,
  } = useProductStore((state) => ({
    page: state.page,
    setPage: state.setPage,
    isLoading: state.isLoading,
    filterPage: state.filterPage,
    isFilterActive: state.isFilterActive,
    setFilterPage: state.setFilterPage,
    totalFilteredPages: state.totalFilteredPages,
  }));

  // В зависимости от того, есть ли какое-то значение внутри фильтрационной формы
  // Увеличиваем или уменьшаем номер страницы при пагинации
  const handlerIncreasePage = () => {
    if (isFilterActive) {
      setFilterPage(filterPage + 1);
    } else {
      setPage(page + 1);
    }
  };

  const handlerDecreasePage = () => {
    if (isFilterActive) {
      setFilterPage(Math.max(filterPage - 1, 1));
    } else {
      setPage(Math.max(page - 1, 1));
    }
  };

  const disablePrev = isFilterActive ? filterPage === 1 : page === 1;
  const disableNext = isFilterActive ? filterPage >= totalFilteredPages : false;

  return (
    <div className="my-5 flex items-center justify-center gap-10 text-2xl text-teal-700">
      <button
        className="rounded bg-teal-600 px-3 py-1 font-semibold text-white hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 disabled:hover:text-white"
        onClick={handlerDecreasePage}
        disabled={isLoading || disablePrev}>
        Prev
      </button>

      <span className="flex gap-2 text-zinc-600">
        Page:
        <span className="text-orange-600">
          {isFilterActive ? filterPage : page}
        </span>
      </span>

      <button
        className="rounded bg-teal-600 px-3 py-1 font-semibold text-white hover:bg-teal-700 disabled:opacity-50 disabled:hover:bg-teal-600 disabled:hover:text-white"
        disabled={isLoading || disableNext}
        onClick={handlerIncreasePage}>
        Next
      </button>
    </div>
  );
};
