import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ButtonComponent, InputComponent, SelectInputComponent, TextAreaComponent } from '@front-lucca-test/storybook/nova';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseDisplayComponent } from './pages/expenses-page/components/expense-display/expense-display.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { ExpensesPageRoutingModule } from './expenses-page.routes.module';
import { ExpensesResolver } from './pages/expenses-page/resolvers/expenses-resolver.service';
import { ExpensesStateModule } from '@front-lucca-test/states/expenses-state';
import { ExpensesPageComponent } from './pages/expenses-page/components/expenses-page/expenses-page.component';
import { ExpensesListComponent } from './pages/expenses-page/components/expenses-list/expenses-list.component';
import { ExpensePageComponent } from './pages/expense-page/components/expense-page.component';
import { ExpenseResolver } from './pages/expense-page/resolvers/expense-resolver.service';
import { AddExpensePageComponent } from './pages/add-expense-page/components/add-expense-page.component';

@NgModule({
	declarations: [
		ExpensesPageComponent,
		AddExpensePageComponent,
		ExpenseFormComponent,
		ExpenseDisplayComponent,
		ExpensesListComponent,
		ExpensePageComponent,
	],
	imports: [
		ExpensesPageRoutingModule,
		HttpClientModule,
		CommonModule,
		ButtonComponent,
		TextAreaComponent,
		SelectInputComponent,
		InputComponent,
		ReactiveFormsModule,
		ExpensesStateModule,
	],
	providers: [ExpensesResolver, ExpenseResolver],
})
export class ExpensesPageModule {}
