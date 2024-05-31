import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthStateFacade } from './facades/auth-state.facade';
import { StoreModule } from '@ngrx/store';
import * as fromAuthState from './reducers/auth-state.reducer';
import { AuthStateEffects } from './effects/auth-state.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
	providers: [AuthStateFacade, HttpClientModule],
	imports: [
		CommonModule,
		StoreModule.forFeature(fromAuthState.AUTH_FEATURE_KEY, fromAuthState.authReducer),
		EffectsModule.forFeature([AuthStateEffects]),
	],
})
export class AuthStateModule {}
