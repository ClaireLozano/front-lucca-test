export interface RequestEditTripExpenses {
	id: number;
	amount: number;
	comment: string;
	purchasedOn: string;
	nature: 'trip';
	distance: number;
}

export interface RequestEditRestaurantExpenses {
	id: number;
	amount: number;
	comment: string;
	purchasedOn: string;
	nature: 'restaurant';
	invites: number;
}

export type RequestEditExpenses = RequestEditTripExpenses | RequestEditRestaurantExpenses;
