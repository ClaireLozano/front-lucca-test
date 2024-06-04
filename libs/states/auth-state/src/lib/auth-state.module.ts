import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { authFeature, signInEffect } from './auth-state';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from './auth.service';

@NgModule({
	imports: [StoreModule.forFeature(authFeature), EffectsModule.forFeature({ signInEffect })],
	providers: [AuthService],
})
export class AuthStateModule {}
