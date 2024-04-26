import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'exp-edit-expense-page',
	templateUrl: './edit-expense-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditExpensePageComponent {
	private router = inject(Router);

	public cancelForm(): void {
		this.router.navigate(['/expenses']);
	}

	public formSubmit(): void {
		alert('Votre dépense a bien été saisie !');
		this.router.navigate(['/expenses']);
	}
}
