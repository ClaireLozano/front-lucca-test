interface BaseExpense {
	id: number;
	amount: string;
	comment: string;
	purchasedOn: string;
	updatedAt: string;
}

export interface TripExpense extends BaseExpense {
	nature: 'trip';
	distance: string;
}

export interface RestaurantExpense extends BaseExpense {
	nature: 'restaurant';
	invites: number;
}

export type Expense = TripExpense | RestaurantExpense;
