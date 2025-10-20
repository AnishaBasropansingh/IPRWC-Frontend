export interface Product {
  product_id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl?: string;
  categorie: { categorie_id: number, name: string };
  // voeg hier andere velden toe zoals afbeelding etc.
}
