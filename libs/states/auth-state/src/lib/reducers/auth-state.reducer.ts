import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AuthStateActions from '../actions/auth-state.actions';
import { AuthStateEntity } from '../models/auth-state.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState extends EntityState<AuthStateEntity> {
	selectedId?: string | number; // which Auth record has been selected
	loaded: boolean; // has the Auth list been loaded
	error?: string | null; // last known error (if any)
}

export interface AuthPartialState {
	readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const authAdapter: EntityAdapter<AuthStateEntity> = createEntityAdapter<AuthStateEntity>();

export const initialAuthState: AuthState = authAdapter.getInitialState({
	// set initial required properties
	loaded: false,
});

const reducer = createReducer(
	initialAuthState,
	on(AuthStateActions.initAuthState, (state) => ({ ...state, loaded: false, error: null })),
	on(AuthStateActions.loadAuthSuccess, (state, { auth }) => authAdapter.setAll(auth, { ...state, loaded: true })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
	return reducer(state, action);
}
