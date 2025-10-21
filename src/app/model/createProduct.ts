export interface CreateProduct {
  product_id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categorie_id: number
}
