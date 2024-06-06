import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, createActionGroup, createFeature, createReducer, createSelector, emptyProps, on, props } from '@ngrx/store';
import { catchError, concat, concatMap, from, map, of, switchMap, tap } from 'rxjs';

import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { SignInRequest } from './models/sign-in-request.interface';
import { SignInResponse } from './models/sign-in-response.interface';
import { AuthState, User } from './models/auth.type';

export const initialState: AuthState = {
	user: undefined,
	isConnected: false,
	signInError: false,
	token: undefined,
};

// Actions
export const authActions = createActionGroup({
	source: 'AuthState',
	events: {
		init: emptyProps(),
		signIn: props<SignInRequest>(),
		signInSuccess: props<SignInResponse>(),
		authenticate: props<SignInResponse>(),
		signInError: emptyProps(),
		signOut: emptyProps(),
	},
});

// Reducers & Selectors
// @ts-expect-error: strictNullChecks
export const authFeature = createFeature({
	name: 'authState',
	reducer: createReducer(
		initialState,
		on(authActions.init, () => ({
			...initialState,
		})),
		on(authActions.authenticate, (state: AuthState, action: SignInResponse) => ({
			...state,
			user: action.user,
			token: action.token,
			isConnected: true,
			signInError: false,
		})),
		on(authActions.signInError, (state: AuthState) => ({
			...state,
			signInError: true,
		})),
		on(authActions.signOut, (state: AuthState) => ({
			...state,
			user: undefined,
			token: undefined,
			isConnected: false,
		})),
	),
	extraSelectors: ({ selectIsConnected }) => ({
		selectIsConnected: createSelector(selectIsConnected, (isConnected) => isConnected),
	}),
});

// Effects
const signInEffect = createEffect(
	() => {
		const actions$ = inject(Actions);
		const authService = inject(AuthService);

		return actions$.pipe(
			ofType(authActions.signIn),
			switchMap((request) =>
				authService.signIn(request).pipe(
					concatMap((auth) => concat(of(authActions.signInSuccess(auth)), of(authActions.authenticate(auth)))),
					catchError(() => of(authActions.signInError())),
				),
			),
		);
	},
	{ functional: true },
);

const signInSuccessEffect = createEffect(
	(actions$ = inject(Actions), authService = inject(AuthService)) => {
		return actions$.pipe(
			ofType(authActions.signInSuccess),
			tap((request) => authService.setToken(request.token)),
		);
	},
	{ dispatch: false, functional: true },
);

const signOutEffect = createEffect(
	(actions$ = inject(Actions), authService = inject(AuthService)) => {
		return actions$.pipe(
			ofType(authActions.signOut),
			tap(() => authService.removeToken()),
		);
	},
	{ dispatch: false, functional: true },
);

export const initEffect = createEffect(
	(actions$ = inject(Actions), authService = inject(AuthService)) => {
		return actions$.pipe(
			ofType(authActions.init),
			switchMap(() => {
				const token = authService.getToken();
				if (token) {
					return from(authService.authenticate()).pipe(map((user: User) => authActions.authenticate({ user, token })));
				}
				return of();
			}),
		);
	},
	{ functional: true },
);

export const effects = { signInSuccessEffect, signInEffect, signOutEffect, initEffect };

// Facades
export function injectAuthFeature() {
	const store = inject(Store);

	return {
		init: () => store.dispatch(authActions.init()),
		signIn: ({ email, password }: SignInRequest) => store.dispatch(authActions.signIn({ email, password })),
		signOut: () => store.dispatch(authActions.signOut()),
		isConnected: store.selectSignal(authFeature.selectIsConnected),
		user: store.selectSignal(authFeature.selectUser),
	};
}
