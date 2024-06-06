import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInResponse } from './models/sign-in-response.interface';
import { SignInRequest } from './models/sign-in-request.interface';
import { User } from './models/auth.type';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

// Todo
const environment = {
	expenseApiUrl: 'http://localhost:3000',
} as const;

@Injectable()
export class AuthService {
	private localStorage;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		// eslint-disable-next-line @typescript-eslint/ban-types
		@Inject(PLATFORM_ID) private platformId: Object,
		private http: HttpClient,
	) {
		if (isPlatformBrowser(this.platformId)) {
			this.localStorage = this.document.defaultView!.localStorage;
		}
	}

	public signIn({ email, password }: SignInRequest): Observable<SignInResponse> {
		return this.http.post<SignInResponse>(`${environment.expenseApiUrl}/auth/login`, { email, password });
	}

	public signOut(): Observable<void> {
		return this.http.get<void>(`${environment.expenseApiUrl}/auth/logout`);
	}

	public authenticate(): Observable<User> {
		return this.http.get<User>(`${environment.expenseApiUrl}/auth/`);
	}

	public getUser(): Observable<void> {
		return this.http.get<void>(`${environment.expenseApiUrl}/users/`);
	}

	public setToken(token: string): void {
		this.localStorage?.setItem('token', token);
	}

	public removeToken(): void {
		this.localStorage?.removeItem('token');
	}

	public getToken(): string | null {
		return this.localStorage?.getItem('token') || null;
	}
}
