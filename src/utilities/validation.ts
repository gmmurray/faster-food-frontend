import type { CategoryModel } from '../models/CategoryModel';
import type { RestaurantModel } from '../models/RestaurantModel';

export const validResultCount = (resultCount: any): boolean => {
  switch (true) {
    case !resultCount:
    case typeof resultCount !== 'number':
    case (resultCount as number) < 1:
      return false;
    default:
      return true;
  }
};
export const invalidResultCountMessage = 'You need at least one result';

export const validZipCode = (zipCode: any): boolean => {
  switch (true) {
    case !zipCode:
    case typeof zipCode !== 'string':
    case zipCode.length !== 5:
      return false;
    default:
      return true;
  }
};
export const invalidZipCodeMessage = 'Please enter a valid zip code';

export const validSelectedCategories = (
  categories: CategoryModel[],
): boolean => {
  switch (true) {
    case !categories:
    case categories.length !== 5:
      return false;
    default:
      return true;
  }
};

export const validSelectedRestaurants = (
  restaurants: RestaurantModel[],
): boolean => {
  switch (true) {
    case !restaurants:
    case restaurants.length !== 3:
      return false;
    default:
      return true;
  }
};

export const validWinnerRestaurant = (
  finalRestaurant: RestaurantModel,
): boolean => {
  switch (true) {
    case !finalRestaurant:
      return false;
    default:
      return true;
  }
};

export const validateWizard = (
  currentStep: number,
  resultCount: any,
  zipCode: any,
  categories: CategoryModel[],
  restaurants: RestaurantModel[],
  finalRestaurant: RestaurantModel,
): boolean => {
  switch (currentStep) {
    case 0:
      return true;
    case 1:
      return validSelectedCategories(categories);
    case 2:
      return validResultCount(resultCount) && validZipCode(zipCode);
    case 3:
      return validSelectedRestaurants(restaurants);
    case 4:
      return validWinnerRestaurant(finalRestaurant);
  }
};
