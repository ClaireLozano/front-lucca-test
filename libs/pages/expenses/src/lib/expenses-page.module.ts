import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ButtonComponent, InputComponent, SelectInputComponent, TextAreaComponent } from '@front-lucca-test/storybook/nova';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseDisplayComponent } from './components/expense-display/expense-display.component';
import { ExpenseFormComponent } from './components/expense-form/expense-form.component';
import { ExpensesPageRoutingModule } from './expenses-page.routes.module';
import { ExpensesResolver } from './resolvers/expenses-resolver.service';
import { ExpensesStateEffects, expensesStateReducer } from '@front-lucca-test/states/expenses-state';
import { StoreModule } from '@ngrx/store';
import { ExpensesPageComponent } from './components/expenses-page/expenses-page.component';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
	declarations: [ExpensesPageComponent, ExpenseFormComponent, ExpenseDisplayComponent],
	imports: [
		ExpensesPageRoutingModule,
		HttpClientModule,
		CommonModule,
		ButtonComponent,
		TextAreaComponent,
		SelectInputComponent,
		InputComponent,
		ReactiveFormsModule,
		StoreModule.forFeature('expensesState', expensesStateReducer),
		EffectsModule.forRoot([ExpensesStateEffects]),
	],
	providers: [ExpensesResolver],
})
export class ExpensesPageModule {}
