import { FilterForm } from './components/FilterForm';
import { ProductsList } from './components/ProductsList';

const App = () => {
  return (
    <main>
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-center">
        <h1 className="text-center text-4xl text-teal-700">
          Test Task Valantis
        </h1>
        <FilterForm />
        <ProductsList />
      </div>
    </main>
  );
};

export default App;
