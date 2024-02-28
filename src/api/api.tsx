import axios from 'axios';
import md5 from 'md5';

type Id = string;

// Определяем тип для ответа API
type FetchIdsResponse = {
  result: Id[];
};

interface Item {
  brand: string | null;
  id: string;
  price: number;
  product: string;
}

export async function fetchIds(
  page: number = 1,
  limit: number = 50,
): Promise<Id[]> {
  const password = 'Valantis';
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const authString = md5(`${password}_${timestamp}`);
  const collectedIds = new Set<Id>();
  let attempt = 1;

  const fetchIdsInternal = async (currentPage: number): Promise<void> => {
    const offset = (currentPage - 1) * limit;
    try {
      const response = await axios.post<FetchIdsResponse>(
        'https://api.valantis.store:41000/',
        {
          action: 'get_ids',
          params: { offset, limit: limit * attempt },
        },
        {
          headers: {
            'X-Auth': authString,
          },
        },
      );

      response.data.result.forEach((id) => collectedIds.add(id));

      if (collectedIds.size < limit) {
        await fetchIdsInternal(currentPage + attempt);
        attempt += 1;
      }
    } catch (error) {
      console.error('Ошибка при получении идентификаторов:', error);
      throw error;
    }
  };

  await fetchIdsInternal(page);
  return Array.from(collectedIds).slice(0, limit);
}

export const fetchItems = async (ids: string[]): Promise<Item[]> => {
  const password = 'Valantis';
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const authString = md5(`${password}_${timestamp}`);

  const response = await axios.post(
    'https://api.valantis.store:41000/',
    {
      action: 'get_items',
      params: { ids },
    },
    {
      headers: {
        'X-Auth': authString,
      },
    },
  );

  // Создаем Map для фильтрации дубликатов по id
  const itemsMap = new Map<string, Item>(
    response.data.result.map((item: Item) => [item.id, item]),
  );

  // Преобразуем Map обратно в массив
  const uniqueItems: Item[] = Array.from(itemsMap.values());

  return uniqueItems;
};
