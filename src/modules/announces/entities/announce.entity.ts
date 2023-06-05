enum Brand {
	chevrolet = "chevrolet",
	citroen = "citroen",
	fiat = "fiat",
	ford = "ford",
	honda = "honda",
	hyundai = "hyundai",
	nissan = "nissan",
	peugeot = "peugeot",
	renault = "renault",
	toyota = "toyota",
	volkswagen = "volkswagen"
}

export class Announce {
	id: number;
	isActive: boolean;
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
