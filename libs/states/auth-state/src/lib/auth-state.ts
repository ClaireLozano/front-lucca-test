import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, createActionGroup, createFeature, createReducer, createSelector, emptyProps, on, props } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';

import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { SignInRequest } from './models/sign-in-request.interface';
import { SignInResponse } from './models/sign-in-response.interface';
import { AuthState } from './models/auth.type';

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
		on(authActions.signInSuccess, (state: AuthState, action: SignInResponse) => ({
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
export const signInEffect = createEffect(
	(actions$ = inject(Actions)) => {
		const authService = inject(AuthService);

		return actions$.pipe(
			ofType(authActions.signIn),
			switchMap((request) =>
				authService.signIn(request).pipe(
					map((auth) => authActions.signInSuccess(auth)),
					catchError(() => of(authActions.signInError())),
				),
			),
		);
	},
	{ functional: true },
);

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
