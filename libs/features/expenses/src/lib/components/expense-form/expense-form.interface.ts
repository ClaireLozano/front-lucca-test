import { FormControl } from '@angular/forms';
import { NatureType } from '@front-lucca-test/states/expenses-state';

export interface ExpenseForm {
	nature: FormControl<NatureType>;
	amount: FormControl<number>;
	comment: FormControl<string>;
	purchasedOn: FormControl<string>;
	distance?: FormControl<number>;
	invites?: FormControl<number>;
}
