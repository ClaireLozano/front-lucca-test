import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromExpensesState from './reducers/expenses-state.reducer';
import { ExpensesStateEffects } from './effects/expenses-state.effects';
import { ExpensesStateFacade } from './facades/expenses-state.facade';
import { ExpensesService } from './services/expenses.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
	providers: [ExpensesStateFacade, ExpensesService, HttpClientModule],
	imports: [
		CommonModule,
		StoreModule.forFeature(fromExpensesState.EXPENSES_STATE_FEATURE_KEY, fromExpensesState.expensesStateReducer),
		EffectsModule.forFeature([ExpensesStateEffects]),
	],
})
export class ExpensesStateModule {}
