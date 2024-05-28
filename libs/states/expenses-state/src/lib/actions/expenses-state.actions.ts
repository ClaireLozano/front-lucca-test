import { createAction, props } from '@ngrx/store';
import { Expense } from '../models/expense/expense.interface';
import { RequestAddExpense } from '../models/add-expense/add-expense-request.interface';
import { RequestEditExpense } from '../models/edit-expense/edit-expense-request.interface';

export const initExpensesState = createAction('[ExpensesState Page] Init');

// Get expenses
export const loadExpensesState = createAction('[ExpensesState Page] Load ExpensesState');
export const loadExpensesStateSuccess = createAction('[ExpensesState/API] Load ExpensesState Success', props<{ expenses: Expense[] }>());
export const loadExpensesStateFailure = createAction('[ExpensesState/API] Load ExpensesState Failure');

// Get expense by id
export const loadExpenseByIdStateSuccess = createAction('[ExpensesState/API] Load ExpenseState Success', props<{ expense: Expense }>());
export const loadExpenseByIdStateFailure = createAction('[ExpensesState/API] Load ExpenseState Failure');

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
