// Add expense
export interface RequestAddTripExpenses {
	amount: string;
	comment: string;
	purchasedOn: string;
	nature: 'trip';
	distance: string;
}

export interface RequestAddRestaurantExpenses {
	amount: string;
	comment: string;
	purchasedOn: string;
	nature: 'restaurant';
	invites: number;
}

export type RequestAddExpenses = RequestAddTripExpenses | RequestAddRestaurantExpenses;

// Edit expense
export interface RequestEditTripExpenses {
	id: number;
	amount: string;
	comment: string;
	purchasedOn: string;
	nature: 'trip';
	distance: string;
}

export interface RequestEditRestaurantExpenses {
	id: number;
	amount: string;
	comment: string;
	purchasedOn: string;
	nature: 'restaurant';
	invites: number;
}

export type RequestEditExpenses = RequestEditTripExpenses | RequestEditRestaurantExpenses;
