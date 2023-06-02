enum Brand {
	chevrolet,
	citroen,
	fiat,
	ford,
	honda,
	hyundai,
	nissan,
	peugeot,
	renault,
	toyota,
	volkswagen
}

export class Announce {
	id: number;
	brand: Brand;
	model: string;
	year: string;
	mileage: string;
	fuel: number;
	color: string;
	price: number;
	description: string;
	coverImage: string;
	createdAt: Date;
	updatedAt: Date;
}
