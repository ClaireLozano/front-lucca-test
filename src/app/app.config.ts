import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
	providers: [
		provideClientHydration(),
		provideRouter(appRoutes),
		importProvidersFrom(
			StoreModule.forRoot([], {
				metaReducers: [],
				runtimeChecks: {
					strictStateImmutability: true,
					strictActionImmutability: true,
					strictStateSerializability: true,
					strictActionSerializability: true,
				},
			}),
			StoreDevtoolsModule.instrument({
				maxAge: 25,
				logOnly: true,
			}),
			EffectsModule.forRoot([]),
		),
	],
};
