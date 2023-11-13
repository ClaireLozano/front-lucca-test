import { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{ path: '', redirectTo: 'expenses', pathMatch: 'full' },
	{
		path: 'expenses',
		loadChildren: () => import('@front-lucca-test/expenses').then((m) => m.ExpensesPageModule),
	},
];
