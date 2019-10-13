import {UserInfo} from './user';

export interface UserResponse {
  users: UserInfo[];
  totalElements: number;
  totalPages: number;
}
