export const NATURE_TRIP = 'trip';
export const NATURE_RESTAURANT = 'restaurant';

export type NatureType = typeof NATURE_TRIP | typeof NATURE_RESTAURANT;

export interface BaseExpense {
	id: number;
	amount: number;
	comment: string;
	purchasedOn: string;
	updatedAt: string;
}

export interface TripExpense extends BaseExpense {
	nature: typeof NATURE_TRIP;
	distance: number;
}

export interface RestaurantExpense extends BaseExpense {
	nature: typeof NATURE_RESTAURANT;
	invites: number;
}

export type Expense = TripExpense | RestaurantExpense;
