import { createAction, props } from '@ngrx/store';
import { Expense } from '../models/expense/expense.interface';
import { RequestAddExpense } from '../models/add-expense/add-expense-request.interface';
import { RequestEditExpense } from '../models/edit-expense/edit-expense-request.interface';

// Get expenses
export const initExpensesState = createAction('[ExpensesState Page] Init');
export const loadExpensesStateSuccess = createAction(
	'[ExpensesState/API] Load ExpensesState Success',
	props<{ expenses: Expense[]; numberExpenses: number }>(),
);
export const loadExpensesStateFailure = createAction('[ExpensesState/API] Load ExpensesState Failure');

// Get expense by id
export const initGetExpenseByIdState = createAction('[ExpensesState Page] Get ExpenseState');
export const getExpenseByIdState = createAction('[ExpensesState/API] Get ExpenseState Loading', props<{ id: number }>());
export const getExpenseByIdStateSuccess = createAction('[ExpensesState/API] Get ExpenseState Success', props<{ expense: Expense }>());
export const getExpenseByIdStateFailure = createAction('[ExpensesState/API] Get ExpenseState Failure');

// Add expense
export const initAddExpenseState = createAction('[ExpensesState/API] Add ExpenseState Init');
export const addExpenseState = createAction('[ExpensesState/API] Add ExpenseState Loading', props<{ request: RequestAddExpense }>());
export const addExpenseStateSuccess = createAction('[ExpensesState/API] Add ExpenseState Success');
export const addExpenseStateFailure = createAction('[ExpensesState/API] Add ExpenseState Failure');

// Edit expense
export const initEditExpenseState = createAction('[ExpensesState/API] Edit ExpenseState Init');
export const editExpenseState = createAction('[ExpensesState/API] Edit ExpenseState Loading', props<{ request: RequestEditExpense }>());
export const editExpenseStateSuccess = createAction('[ExpensesState/API] Edit ExpenseState Success');
export const editExpenseStateFailure = createAction('[ExpensesState/API] Edit ExpenseState Failure');

// Set current number page
export const setCurrentPageNumber = createAction('[ExpensesState] Set current number page', props<{ currentPageNumber: number }>());
