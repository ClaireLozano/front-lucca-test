import { Route, RouterModule } from '@angular/router';
import { ExpensesPageComponent } from './lib/components/expenses-page/expenses-page.component';
import { NgModule } from '@angular/core';
import { ExpensesPageResolver } from './lib/resolvers/expenses-page-resolver.service';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { ExpensesState } from './lib/states/expenses.state';
import { ExpensesService } from './lib/services/expenses.service';
import { GetExpensesAction } from './lib/states/expenses.action';

export const expensesPageRoutes: Route[] = [
	{
		path: '**',
		component: ExpensesPageComponent,
		resolve: {
			expenses: ExpensesPageResolver,
		},
	},
];

@NgModule({
	exports: [RouterModule],
	providers: [ExpensesService],
	imports: [
		RouterModule.forChild(expensesPageRoutes),
		NgxsModule.forRoot([ExpensesState, GetExpensesAction]),
		NgxsReduxDevtoolsPluginModule.forRoot(),
	],
})
export class ExpensesPageRoutingModule {}
