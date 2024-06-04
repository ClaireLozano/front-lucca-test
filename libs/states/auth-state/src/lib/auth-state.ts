import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, createActionGroup, createFeature, createReducer, createSelector, emptyProps, on, props } from '@ngrx/store';
import { catchError, map, of, switchMap } from 'rxjs';

import { inject } from '@angular/core';
import { AuthService } from './auth.service';

// Models
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

export const initialState: AuthState = {
	user: undefined,
	isConnected: false,
	signInError: false,
};

// Actions
export const authActions = createActionGroup({
	source: 'AuthState',
	events: {
		init: emptyProps(),
		signIn: props<{ email: string; password: string }>(),
		signInSuccess: props<{ id: number; email: string; name: string }>(),
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
		on(authActions.signInSuccess, (state: AuthState, action: { id: number; name: string; email: string }) => ({
			...state,
			user: {
				id: action.id,
				name: action.name,
				email: action.email,
			},
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
		signIn: ({ email, password }: { email: string; password: string }) => store.dispatch(authActions.signIn({ email, password })),
		signOut: () => store.dispatch(authActions.signOut()),
		isConnected: store.selectSignal(authFeature.selectIsConnected),
	};
}
