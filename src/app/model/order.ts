import {Product} from './product';
import {User} from './user';

export interface Order {
  order_id: number;
  orderDate : string;
  totalPrice : number;
  user : User;
  products : Product[];
}
