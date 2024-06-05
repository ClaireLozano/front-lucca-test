import { User } from './auth.type';

export interface SignInResponse {
	user: User;
	token: string;
}
