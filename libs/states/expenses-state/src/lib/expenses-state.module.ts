import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromExpensesState from './libs/states/expenses-state/reducers/expenses-state.reducer';
import { ExpensesStateEffects } from './libs/states/expenses-state/effects/expenses-state.effects';
import { ExpensesStateFacade } from './libs/states/expenses-state/facades/expenses-state.facade';

@NgModule({
	providers: [ExpensesStateFacade],
	imports: [
		StoreModule.forFeature(fromExpensesState.EXPENSES_STATE_FEATURE_KEY, fromExpensesState.expensesStateReducer),
		EffectsModule.forFeature([ExpensesStateEffects]),
	],
})
export class ExpensesStateModule {}
