import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../../../utils/page.service';

@Component({
	selector: 'exp-add-expense-page',
	templateUrl: './add-expense-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExpensePageComponent implements AfterViewInit {
	private router = inject(Router);
	private pageService = inject(PageService);

	public ngAfterViewInit(): void {
		this.pageService.setTitle('Add an expense');
		this.pageService.focusTitleH1();
	}

	public cancelForm(): void {
		this.router.navigate(['/expenses']);
	}

	public formSubmit(): void {
		alert('Votre dépense a bien été saisie !');
		this.router.navigate(['/expenses']);
	}
}
