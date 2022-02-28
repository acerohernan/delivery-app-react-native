export interface IRestaurant {
  id: string;
  name: string;
  image_url: string;
  is_closed: boolean;
  review_count: number;
  categories: Array<IRestaurantCategory>;
  rating: number;
  price: string;
}

export interface IRestaurantCategory {
  alias: string;
  title: string;
}

export interface RestaurantState {
  category: string;
  items: Array<IRestaurant>;
  status: string;
}
