export interface OrderDTO {
  user_id: number | null;
  product_id: number[];
  totalPrice: number;
  orderDate: string;
}
