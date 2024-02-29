import axios, { AxiosError } from 'axios';
import { generateAuthHeader } from '../utils';

type FetchIdsResponse = {
  result: string[];
};

interface Item {
  brand: string | null;
  id: string;
  price: number;
  product: string;
}

// не убрал в .env, чтобы у проверящих не было проблем при тестировании
const BASE_URL = 'https://api.valantis.store:41000/';
const PASSWORD = 'Valantis';

export async function fetchIds(
  page: number = 1,
  limit: number = 50,
): Promise<string[]> {
  const authString = generateAuthHeader(PASSWORD);
  const collectedIds = new Set<string>();
  let attempt = 1;

  const fetchIdsInternal = async (currentPage: number): Promise<void> => {
    const offset = (currentPage - 1) * limit;
    try {
      const response = await axios.post<FetchIdsResponse>(
        BASE_URL,
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
      const message =
        (error as AxiosError).response?.data || (error as Error).message;
      console.error('Ошибка при получении идентификаторов:', message);
      throw error;
    }
  };

  await fetchIdsInternal(page);
  return Array.from(collectedIds).slice(0, limit);
}

export const fetchItems = async (ids: string[]): Promise<Item[]> => {
  const authString = generateAuthHeader(PASSWORD);
  try {
    const response = await axios.post(
      BASE_URL,
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

    const itemsMap = new Map<string, Item>(
      response.data.result.map((item: Item) => [item.id, item]),
    );

    const uniqueItems: Item[] = Array.from(itemsMap.values());

    return uniqueItems;
  } catch (error) {
    const message =
      (error as AxiosError).response?.data || (error as Error).message;
    console.error('Ошибка при получении товаров:', message);
    throw error;
  }
};

export const filterItems = async (filters: {
  price?: number;
  product?: string;
  brand?: string;
}) => {
  const authString = generateAuthHeader(PASSWORD);

  const headers = {
    'X-Auth': authString,
  };
  try {
    const filterResults = async (
      filterParam: string,
      value: string | number,
    ) => {
      const response = await axios.post(
        BASE_URL,
        {
          action: 'filter',
          params: { [filterParam]: value },
        },
        { headers },
      );

      return response.data.result;
    };

    let results: string[] = [];

    // Последовательно применяем фильтры, если они заданы
    if (filters.price) {
      results = await filterResults('price', filters.price);
    }
    if (filters.product) {
      const productResults = await filterResults('product', filters.product);
      results = results.length
        ? results.filter((id) => productResults.includes(id))
        : productResults;
    }
    if (filters.brand) {
      const brandResults = await filterResults('brand', filters.brand);
      results = results.length
        ? results.filter((id) => brandResults.includes(id))
        : brandResults;
    }
    return results;
  } catch (error) {
    const message =
      (error as AxiosError).response?.data || (error as Error).message;
    console.error('Ошибка при фильтрации:', message);
    return [];
  }
};
