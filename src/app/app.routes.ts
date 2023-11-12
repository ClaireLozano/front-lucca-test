import { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{
		path: '',
		loadComponent: () => import('@front-lucca-test/expenses').then((m) => m.ExpensesComponent),
	},
];
