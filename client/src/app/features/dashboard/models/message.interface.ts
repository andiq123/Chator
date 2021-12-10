import { User } from 'src/app/shared/models/user.interface';

export interface Message {
  sender: User;
  reciever: User;
  sent: string;
  message: string;
}
