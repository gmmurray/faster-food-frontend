import type { RestaurantRequest } from '../types/apiTypes';
import { validResultCount, validZipCode } from './validation';

export const validRestaurantRequest = (request: RestaurantRequest): boolean => {
  const { resultCount, zipCode, category } = request;
  return validResultCount(resultCount) && validZipCode(zipCode) && !!category;
};
