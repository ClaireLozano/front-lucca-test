export interface RequestAddTripExpense {
	amount: number;
	comment: string;
	purchasedOn: string;
	nature: 'trip';
	distance: number;
}

export interface RequestAddRestaurantExpense {
	amount: number;
	comment: string;
	purchasedOn: string;
	nature: 'restaurant';
	invites: number;
}

export type RequestAddExpense = RequestAddTripExpense | RequestAddRestaurantExpense;
