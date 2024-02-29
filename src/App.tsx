import { FilteredProductsList } from './components/FilteredProductsList';
import { PageSelector } from './components/PageSelector';
import { ProductsFilterForm } from './components/ProductsFilterForm';
import { ProductsList } from './components/ProductsList';
import { useProductStore } from './store';
import { Footer } from './components/Footer';

const App = () => {
  const { isFilterActive } = useProductStore((state) => ({
    isFilterActive: state.isFilterActive,
  }));
  return (
    <main>
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center">
        <h1 className="my-6 text-center text-4xl text-teal-700">
          Test Task Valantis
        </h1>
        <ProductsFilterForm />
        <PageSelector />
        {isFilterActive ? <FilteredProductsList /> : <ProductsList />}
      </div>
      <Footer />
    </main>
  );
};

export default App;
