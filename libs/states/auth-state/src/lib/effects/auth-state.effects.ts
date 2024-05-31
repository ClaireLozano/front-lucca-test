import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, of } from 'rxjs';
import * as AuthStateActions from '../actions/auth-state.actions';

@Injectable()
export class AuthStateEffects {
	private actions$ = inject(Actions);

	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthStateActions.initAuthState),
			switchMap(() => of(AuthStateActions.loadAuthSuccess({ auth: [] }))),
		),
	);
}
