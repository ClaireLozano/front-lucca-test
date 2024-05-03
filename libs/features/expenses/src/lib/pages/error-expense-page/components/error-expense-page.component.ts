import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PageService } from '../../../utils/page.service';

@Component({
	selector: 'exp-error-expense-page',
	templateUrl: './error-expense-page.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorExpensePageComponent implements AfterViewInit {
	private pageService = inject(PageService);

	public ngAfterViewInit(): void {
		this.pageService.setTitle('Error');
		this.pageService.focusTitleH1();
	}
}
