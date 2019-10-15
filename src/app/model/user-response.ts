import {User} from './user';

export interface UserResponse {
  users: User[];
  totalElements: number;
  totalPages: number;
}
