import axios, { AxiosError } from 'axios';
import md5 from 'md5';

type Id = string;

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
  const password = 'Valantis';
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const authString = md5(`${password}_${timestamp}`);
  try {
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

export const filterItemsByPrice = async (price: number) => {
  const password = 'Valantis';
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const authString = md5(`${password}_${timestamp}`);
  const response = await axios.post(
    'https://api.valantis.store:41000/',
    {
      action: 'filter',
      params: { price },
    },
    {
      headers: {
        'X-Auth': authString,
      },
    },
  );
  return response.data;
};

export const filterItemsByProductName = async (product: string) => {
  const password = 'Valantis';
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const authString = md5(`${password}_${timestamp}`);
  const response = await axios.post(
    'https://api.valantis.store:41000/',
    {
      action: 'filter',
      params: { product },
    },
    {
      headers: {
        'X-Auth': authString,
      },
    },
  );
  return response.data;
};

export const filterItemsByBrand = async (brand: string) => {
  const password = 'Valantis';
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const authString = md5(`${password}_${timestamp}`);
  const response = await axios.post(
    'https://api.valantis.store:41000/',
    {
      action: 'filter',
      params: { brand },
    },
    {
      headers: {
        'X-Auth': authString,
      },
    },
  );
  return response.data;
};

export const filterItems = async (filters: {
  price?: number;
  product?: string;
  brand?: string;
}) => {
  const password = 'Valantis';
  const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const authString = md5(`${password}_${timestamp}`);
  const baseURL = 'https://api.valantis.store:41000/';

  const headers = {
    'X-Auth': authString,
  };

  const filterResults = async (filterParam: string, value: any) => {
    const response = await axios.post(
      baseURL,
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
};
