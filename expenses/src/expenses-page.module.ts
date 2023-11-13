import { NgModule } from '@angular/core';

import { ExpensesPageComponent } from './lib/components/expenses-page/expenses-page.component';
import { ExpenseFormComponent } from './lib/components/expense-form/expense-form.component';
import { ExpenseDisplayComponent } from './lib/components/expense-display/expense-display.component';
import { ExpensesPageRoutingModule } from './expenses-page-routing.module';

@NgModule({
	declarations: [ExpensesPageComponent, ExpenseFormComponent, ExpenseDisplayComponent],
	exports: [ExpensesPageComponent],
	imports: [ExpensesPageRoutingModule],
})
export class ExpensesPageModule {}
