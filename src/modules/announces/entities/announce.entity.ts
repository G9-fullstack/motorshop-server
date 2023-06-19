export class Announce {
	readonly id: number;
	isActive: boolean;
	brand: string;
	model: string;
	year: string;
	mileage: string;
	fuel: string;
	color: string;
	price: number;
	description: string;
	coverImage: string;
	readonly createdAt: Date;
	readonly updatedAt: Date;
}
