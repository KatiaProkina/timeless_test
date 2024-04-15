export interface User {
		name: {
				first: string;
				last: string;
		};
		email: string;
		phone: string;
		dob: {
				date: string;
				age: string;
		};
		location: {
				city: string;
				state: string;
				country: string;
		};
		picture: {
				thumbnail: string;
		};
		gender: string;
}

export interface UsersResponse {
		info: {
				page: number;
				results: number;
				seed: string
				version: string
		},
		results: User[]
}
