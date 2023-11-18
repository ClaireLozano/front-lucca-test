export interface RequestEditTripExpense {
	id: number;
	amount: number;
	comment: string;
	purchasedOn: string;
	nature: 'trip';
	distance: number;
}

export interface RequestEditRestaurantExpense {
	id: number;
	amount: number;
	comment: string;
	purchasedOn: string;
	nature: 'restaurant';
	invites: number;
}

export type RequestEditExpense = RequestEditTripExpense | RequestEditRestaurantExpense;
