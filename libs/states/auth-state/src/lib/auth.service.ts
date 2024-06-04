import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInResponse } from './models/sign-in-response.interface';
import { SignInRequest } from './models/sign-in-request.interface';

// Todo
const environment = {
	expenseApiUrl: 'http://localhost:3000',
} as const;

@Injectable()
export class AuthService {
	constructor(private http: HttpClient) {}

	/**
	 * Sign in
	 */
	public signIn({ email, password }: SignInRequest): Observable<SignInResponse> {
		return this.http.post<SignInResponse>(`${environment.expenseApiUrl}/auth/login`, { email, password });
	}

	/**
	 * SignOut
	 */
	public signOut(): Observable<void> {
		return this.http.get<void>(`${environment.expenseApiUrl}/auth/logout`);
	}
}
