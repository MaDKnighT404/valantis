import { ItemsList } from './components/ItemsList';

const App = () => {
  return (
    <main className="h-screen">
      <div className="container mx-auto flex  flex-col items-center justify-center">
        <h1 className="text-center text-4xl text-teal-700">
          Test Task Valantis
        </h1>
        <ItemsList />
      </div>
    </main>
  );
};

export default App;
