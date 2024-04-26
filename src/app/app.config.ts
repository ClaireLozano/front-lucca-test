import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
	providers: [
		provideHttpClient(withFetch()), //  It's strongly recommended to enable `fetch` for applications that use Server-Side Rendering for better performance and compatibility.
		provideClientHydration(
			withHttpTransferCacheOptions({
				includePostRequests: true,
			}),
		),
		provideRouter(appRoutes, withComponentInputBinding()),
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
