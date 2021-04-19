import { ApiClient } from './utilities/apiClient';
import type { RestaurantRequest } from './types/apiTypes';
const apiClient = new ApiClient();

export const getCategories = async (): Promise<any> => {
  return await apiClient.get({ url: 'restaurants/categories' });
};

export const getRestaurants = async (body: RestaurantRequest): Promise<any> => {
  return await apiClient.post({
    url: 'restaurants',
    body,
  });
};
