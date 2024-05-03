import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from '@front-lucca-test/states/expenses-state';
import { PageService } from '../../../../utils/page.service';

@Component({
	selector: 'exp-expenses-page',
	templateUrl: './expenses-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpensesPageComponent implements AfterViewInit {
	private router = inject(Router);
	private pageService = inject(PageService);

	public ngAfterViewInit(): void {
		this.pageService.setTitle('Expense');
		this.pageService.focusTitleH1();
	}

	public editExpense(expense: Expense): void {
		this.router.navigate(['/expenses/' + expense.id]);
	}
}
