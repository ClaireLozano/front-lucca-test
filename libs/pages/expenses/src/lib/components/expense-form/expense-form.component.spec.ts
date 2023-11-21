import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpenseFormComponent } from './expense-form.component';
import { SelectInputComponent, InputComponent, ButtonComponent, TextAreaComponent } from '@front-lucca-test/storybook/nova';
import { MockComponent } from 'ng-mocks';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExpensesStateFacade } from '@front-lucca-test/states/expenses-state';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

describe('ExpenseFormComponent', () => {
	let component: ExpenseFormComponent;
	let fixture: ComponentFixture<ExpenseFormComponent>;

	let expensesStateFacade: ExpensesStateFacade;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				ExpenseFormComponent,
				MockComponent(SelectInputComponent),
				MockComponent(InputComponent),
				MockComponent(TextAreaComponent),
				MockComponent(ButtonComponent),
				ReactiveFormsModule,
				FormsModule,
			],
			providers: [
				provideMockStore(),
				{
					provide: ExpensesStateFacade,
					useValue: {
						initAddExpense: jest.fn(),
						initEditExpense: jest.fn(),
						editExpense: jest.fn(),
						editExpenseStatusSignal: jest.fn(),
						addExpense: jest.fn(),
						addExpenseStatusSignal: jest.fn(),
					},
				},
			],
		}).compileComponents();
	});

	beforeEach(() => {
		expensesStateFacade = TestBed.inject(ExpensesStateFacade);

		fixture = TestBed.createComponent(ExpenseFormComponent);
		component = fixture.componentInstance;
	});

	describe('when user adds a new expense', () => {
		beforeEach(() => {
			component.action = 'add';
			component.title = 'Title';

			fixture.detectChanges();
		});

		describe('when the nature of the expense is restaurant', () => {
			it('should add nature form control', () => {
				expect(component.form.contains('nature')).toBe(true);
			});

			it('should add amount form control', () => {
				expect(component.form.contains('amount')).toBe(true);
			});

			it('should add comment form control', () => {
				expect(component.form.contains('comment')).toBe(true);
			});

			it('should add purchasedOn form control', () => {
				expect(component.form.contains('purchasedOn')).toBe(true);
			});

			it('should add invites form control', () => {
				expect(component.form.contains('invites')).toBe(true);
			});

			it('should not add distance form control', () => {
				expect(component.form.contains('distance')).toBe(false);
			});

			describe('when user clicks on submit button', () => {
				beforeEach(() => {
					jest.spyOn(component, 'onSubmit');
					const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
					formElement.dispatchEvent(new Event('submit'));
					fixture.detectChanges();
				});

				it('should call onSubmit function', () => {
					expect(component.onSubmit).toHaveBeenCalled();
				});

				it('should display invalid form error message', () => {
					const errorMessage = fixture.debugElement.query(By.css('.error-message')).nativeElement;
					expect(errorMessage.textContent.trim()).toEqual('Formulaire invalide, veuillez saisir tous les champs obligatoires');
				});

				describe('when user fill correctly the form', () => {
					beforeEach(() => {
						component.form.get('amount')?.patchValue(4.4);
						component.form.get('comment')?.patchValue('i am a comment');
						component.form.get('purchasedOn')?.patchValue('2023-01-01');
						component.form.get('invites')?.patchValue(2);
						component.form.markAsDirty();
						fixture.detectChanges();
					});

					describe('when user fill correctly the form', () => {
						beforeEach(() => {
							jest.spyOn(expensesStateFacade, 'addExpense');
							const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
							formElement.dispatchEvent(new Event('submit'));
							fixture.detectChanges();
						});

						it('should call addExpense function', () => {
							expect(expensesStateFacade.addExpense).toHaveBeenCalledWith({
								amount: 4.4,
								comment: 'i am a comment',
								invites: 2,
								nature: 'restaurant',
								purchasedOn: '2023-01-01',
							});
						});
					});
				});
			});
		});

		describe('when the nature of the expense is trip', () => {
			beforeEach(() => {
				component.form.get('nature')?.patchValue('trip');
				fixture.detectChanges();
			});

			it('should add invites form control', () => {
				expect(component.form.contains('invites')).toBe(false);
			});

			it('should not add distance form control', () => {
				expect(component.form.contains('distance')).toBe(true);
			});

			describe('when user fill correctly the form', () => {
				beforeEach(() => {
					component.form.get('amount')?.patchValue(4.4);
					component.form.get('comment')?.patchValue('i am a comment');
					component.form.get('purchasedOn')?.patchValue('2023-01-01');
					component.form.get('distance')?.patchValue(223);
					component.form.markAsDirty();
					fixture.detectChanges();
				});

				describe('when user clicks on submit button', () => {
					beforeEach(() => {
						jest.spyOn(expensesStateFacade, 'addExpense');
						const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
						formElement.dispatchEvent(new Event('submit'));
						fixture.detectChanges();
					});

					it('should call addExpense function', () => {
						expect(expensesStateFacade.addExpense).toHaveBeenCalledWith({
							amount: 4.4,
							comment: 'i am a comment',
							distance: 223,
							nature: 'trip',
							purchasedOn: '2023-01-01',
						});
					});
				});
			});
		});
	});

	describe('when user edits an existing trip expense', () => {
		beforeEach(() => {
			component.action = 'edit';
			component.title = 'Title';
			component.expense = {
				id: 1,
				amount: 4.4,
				comment: 'i am a comment',
				distance: 223,
				nature: 'trip',
				purchasedOn: '2023-01-01',
				updatedAt: '1111',
			};

			fixture.detectChanges();
		});

		it('should set nature form control value', () => {
			expect(component.form.get('nature')?.value).toBe('trip');
		});

		it('should set amount form control', () => {
			expect(component.form.get('amount')?.value).toBe(4.4);
		});

		it('should set comment form control', () => {
			expect(component.form.get('comment')?.value).toBe('i am a comment');
		});

		it('should set purchasedOn form control', () => {
			expect(component.form.get('purchasedOn')?.value).toBe('2023-01-01');
		});

		it('should set add distance form control', () => {
			expect(component.form.get('distance')?.value).toBe(223);
		});

		describe('when user clicks on submit button', () => {
			beforeEach(() => {
				jest.spyOn(component, 'onSubmit');
				const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
				formElement.dispatchEvent(new Event('submit'));
				fixture.detectChanges();
			});

			it('should call onSubmit function', () => {
				expect(component.onSubmit).toHaveBeenCalled();
			});

			it('should display untouched form error message', () => {
				const errorMessage = fixture.debugElement.query(By.css('.error-message')).nativeElement;
				expect(errorMessage.textContent.trim()).toEqual("Aucune modification n'a été saisie");
			});

			describe('when user modifies the form', () => {
				beforeEach(() => {
					component.form.get('comment')?.patchValue('another comment');
					component.form.markAsDirty();
					fixture.detectChanges();
				});

				describe('when user clicks on submit button', () => {
					beforeEach(() => {
						jest.spyOn(expensesStateFacade, 'editExpense');
						const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
						formElement.dispatchEvent(new Event('submit'));
						fixture.detectChanges();
					});

					it('should call editExpense function', () => {
						expect(expensesStateFacade.editExpense).toHaveBeenCalledWith({
							id: 1,
							amount: 4.4,
							comment: 'another comment',
							distance: 223,
							nature: 'trip',
							purchasedOn: '2023-01-01',
						});
					});
				});
			});
		});
	});

	describe('when user edits an existing restaurant expense', () => {
		beforeEach(() => {
			component.action = 'edit';
			component.title = 'Title';
			component.expense = {
				id: 1,
				amount: 4.4,
				comment: 'i am a comment',
				invites: 3,
				nature: 'restaurant',
				purchasedOn: '2023-01-01',
				updatedAt: '1111',
			};

			fixture.detectChanges();
		});

		it('should set nature form control value', () => {
			expect(component.form.getRawValue().nature).toBe('restaurant');
		});

		it('should set amount form control', () => {
			expect(component.form.getRawValue().amount).toBe(4.4);
		});

		it('should set comment form control', () => {
			expect(component.form.getRawValue().comment).toBe('i am a comment');
		});

		it('should set purchasedOn form control', () => {
			expect(component.form.getRawValue().purchasedOn).toBe('2023-01-01');
		});

		it('should set add invites form control', () => {
			expect(component.form.getRawValue().invites).toBe(3);
		});

		describe('when user clicks on submit button', () => {
			beforeEach(() => {
				jest.spyOn(component, 'onSubmit');
				const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
				formElement.dispatchEvent(new Event('submit'));
				fixture.detectChanges();
			});

			it('should call onSubmit function', () => {
				expect(component.onSubmit).toHaveBeenCalled();
			});

			it('should display untouched form error message', () => {
				const errorMessage = fixture.debugElement.query(By.css('.error-message')).nativeElement;
				expect(errorMessage.textContent.trim()).toEqual("Aucune modification n'a été saisie");
			});

			describe('when user modifies the form', () => {
				beforeEach(() => {
					component.form.get('comment')?.patchValue('another comment');
					component.form.markAsDirty();
					fixture.detectChanges();
				});

				describe('when user clicks on submit button', () => {
					beforeEach(() => {
						jest.spyOn(expensesStateFacade, 'editExpense');
						const formElement = fixture.debugElement.query(By.css('form')).nativeElement;
						formElement.dispatchEvent(new Event('submit'));
						fixture.detectChanges();
					});

					it('should call editExpense function', () => {
						expect(expensesStateFacade.editExpense).toHaveBeenCalledWith({
							id: 1,
							amount: 4.4,
							comment: 'another comment',
							invites: 3,
							nature: 'restaurant',
							purchasedOn: '2023-01-01',
						});
					});
				});
			});
		});
	});
});
