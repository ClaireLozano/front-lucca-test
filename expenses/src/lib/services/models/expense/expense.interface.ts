interface BaseExpense {
	id: number;
	amount: number;
	comment: string;
	purchasedOn: string;
	updatedAt: string;
}

export interface TripExpense extends BaseExpense {
	nature: 'trip';
	distance: number;
}

export interface RestaurantExpense extends BaseExpense {
	nature: 'restaurant';
	invites: number;
}

export type Expense = TripExpense | RestaurantExpense;
