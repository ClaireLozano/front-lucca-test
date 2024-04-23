import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Route } from '@angular/router';

export const appRoutes: Route[] = [
	{ path: '', redirectTo: 'expenses' },
	{
		path: 'expenses',
		// component: Component-name
		// Pour lazy loader une route :
		loadChildren: () => import('@front-lucca-test/expenses').then((m) => m.ExpensesPageModule),
	},
];

@NgModule({
	exports: [RouterModule],
	imports: [RouterModule.forRoot(appRoutes)],
})
export class AppRoutingModule {}
