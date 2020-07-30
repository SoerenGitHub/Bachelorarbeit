import { UserInfo } from './user-info';
import { Meeting } from './meeting';

export interface User {
  // Information of the user => id, forename, name
  publicInfo: UserInfo;
  // Array with the IDs of users who want to be friends with this user
  friendRequests?: Array<string>;
  // Array with the IDs of users who are friends with this user
  friends?: Array<string>;
  // Created meetings of this user
  meetings?: Array<Meeting>;
}
