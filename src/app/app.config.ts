import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ExpensesStateEffects, expensesStateReducer } from '@front-lucca-test/states/expenses-state';

export const appConfig: ApplicationConfig = {
	providers: [provideClientHydration(), provideRouter(appRoutes), provideStore(expensesStateReducer), provideEffects(ExpensesStateEffects)],
};
