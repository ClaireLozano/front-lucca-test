import { TestBed } from '@angular/core/testing';

import { ExpensesPageResolver } from './expenses-page-resolver.service';

describe('ExpensesPageResolver', () => {
	let service: ExpensesPageResolver;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(ExpensesPageResolver);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
