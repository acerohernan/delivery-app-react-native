import { IRestaurantCategory } from "../redux/models";

export const useRestaurantCategories = (
  categories: Array<IRestaurantCategory>
) => {
  return categories.map((category) => category.title).join(" • ");
};
