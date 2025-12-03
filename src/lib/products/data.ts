export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  priceType?: "fixed" | "range";
  priceMax?: number | null;
  rating: number;
  reviewsCount: number;
  size: string;
  thickness: string;
  description: string;
  image: string;
}
