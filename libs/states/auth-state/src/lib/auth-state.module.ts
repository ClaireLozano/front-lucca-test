import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { authFeature, effects } from './auth-state';
import { EffectsModule } from '@ngrx/effects';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
	imports: [StoreModule.forFeature(authFeature), EffectsModule.forFeature(effects)],
	providers: [
		AuthService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
})
export class AuthStateModule {}
