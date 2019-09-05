import { User as AppUser } from './models/userModel';

declare global {
  namespace Express {
    interface User extends AppUser {}
  }
}
