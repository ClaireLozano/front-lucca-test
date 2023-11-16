export interface RequestAddTripExpenses {
	amount: number;
	comment: string;
	purchasedOn: string;
	nature: 'trip';
	distance: number;
}

export interface RequestAddRestaurantExpenses {
	amount: number;
	comment: string;
	purchasedOn: string;
	nature: 'restaurant';
	invites: number;
}

export type RequestAddExpenses = RequestAddTripExpenses | RequestAddRestaurantExpenses;
