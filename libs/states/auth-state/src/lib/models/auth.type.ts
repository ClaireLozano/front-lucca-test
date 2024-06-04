export type User = {
	id: number;
	name: string;
	email: string;
};

export type AuthState = {
	user?: User;
	isConnected: boolean;
	signInError: boolean;
};
