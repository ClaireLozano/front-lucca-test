import { createAction, props } from '@ngrx/store';
import { AuthStateEntity } from '../models/auth-state.models';

export const initAuthState = createAction('[Auth Page] Init');

export const loadAuthSuccess = createAction('[Auth/API] Load Auth Success', props<{ auth: AuthStateEntity[] }>());
