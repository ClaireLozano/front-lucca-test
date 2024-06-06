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

	public signIn({ email, password }: SignInRequest): Observable<SignInResponse> {
		return this.http.post<SignInResponse>(`${environment.expenseApiUrl}/auth/login`, { email, password });
	}

	public signOut(): Observable<void> {
		return this.http.get<void>(`${environment.expenseApiUrl}/auth/logout`);
	}

	public getUser(): Observable<void> {
		return this.http.get<void>(`${environment.expenseApiUrl}/users/`);
	}

	public setToken(token: string): void {
		localStorage.setItem('token', token);
	}

	public removeToken(): void {
		localStorage.removeItem('token');
	}

	public getToken(): string | null {
		return localStorage.getItem('token');
	}
}
