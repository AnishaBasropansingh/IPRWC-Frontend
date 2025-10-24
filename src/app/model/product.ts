export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  quantity: number;
  imageUrl?: string;
  categorie: { categorie_id: number, name: string };
}
