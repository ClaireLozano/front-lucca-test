import { NgModule } from '@angular/core';

import { ExpensesPageComponent } from './lib/components/expenses-page/expenses-page.component';
import { ExpenseFormComponent } from './lib/components/expense-form/expense-form.component';
import { ExpenseDisplayComponent } from './lib/components/expense-display/expense-display.component';
import { ExpensesPageRoutingModule } from './expenses-page-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ExpensesService } from './lib/services/expenses.service';
import { ExpensesPageResolver } from './lib/resolvers/expenses-page-resolver.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent, InputComponent, SelectInputComponent, TextAreaComponent } from '@front-lucca-test/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
		FormsModule,
	],
	providers: [ExpensesService, ExpensesPageResolver],
})
export class ExpensesPageModule {}
