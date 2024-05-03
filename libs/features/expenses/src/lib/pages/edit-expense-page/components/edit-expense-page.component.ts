import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../../../utils/page.service';

@Component({
	selector: 'exp-edit-expense-page',
	templateUrl: './edit-expense-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditExpensePageComponent implements AfterViewInit {
	private router = inject(Router);
	private pageService = inject(PageService);

	public ngAfterViewInit(): void {
		this.pageService.setTitle('Edit your expense');
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
