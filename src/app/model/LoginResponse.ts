import {User} from './user';

export interface LoginResponse {
  email: string;
  token: string;
  user: User;
}
