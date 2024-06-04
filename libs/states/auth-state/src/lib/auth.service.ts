import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
	public signIn({ email, password }: { email: string; password: string }): Observable<{ email: string; name: string; id: number }> {
		return this.http.post<{ email: string; name: string; id: number }>(`${environment.expenseApiUrl}/auth/login`, { email, password });
	}

	/**
	 * SignOut
	 */
	public signOut(): Observable<void> {
		return this.http.get<void>(`${environment.expenseApiUrl}/auth/logout`);
	}
}
