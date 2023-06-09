import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	const userData = [
		{
			name: "User 1",
			email: "user1@example.com",
			password: hashSync("123", 10),
			cpf: "98765432100",
			phoneNumber: "1188888888",
			birthdate: "01/01/1990",
			description: "Description 1",
			isSeller: true,
			address: {
				zipCode: "44556677",
				state: "SP",
				city: "City 1",
				street: "Street 1",
				number: "111",
			},
		},
		{
			name: "User 2",
			email: "user2@example.com",
			password: hashSync("123", 10),
			cpf: "54321678902",
			phoneNumber: "1177777777",
			birthdate: "02/02/1995",
			description: "Description 2",
			isSeller: false,
			address: {
				zipCode: "88990011",
				state: "MG",
				city: "City 2",
				street: "Street 2",
				number: "222",
			},
		},
		{
			name: "User 3",
			email: "user3@example.com",
			password: hashSync("123", 10),
			cpf: "98765432102",
			phoneNumber: "1166666666",
			birthdate: "03/03/1992",
			description: "Description 3",
			isSeller: true,
			address: {
				zipCode: "77889900",
				state: "BA",
				city: "City 3",
				street: "Street 3",
				number: "333",
			},
		}
	];

	for (const user of userData) {
		const { address, ...userWithoutAddress } = user;
		await prisma.user.create({
			data: {
				address: {
					create: address,
				},
				...userWithoutAddress,
			},
		});
	}

	await prisma.announce.createMany({
		data: [
			{
				isActive: true,
				brand: "Chevrolet",
				model: "Cruze",
				year: "2015",
				mileage: "70000",
				fuel: "Gasoline",
				color: "Silver",
				price: 20000,
				description: "New Description Announce",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 1,
			},
			{
				isActive: false,
				brand: "Ford",
				model: "Fiesta",
				year: "2012",
				mileage: "40000",
				fuel: "Diesel",
				color: "Red",
				price: 15000,
				description: "Used Car in Good Condition",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 3,
			},
			{
				isActive: true,
				brand: "Toyota",
				model: "Corolla",
				year: "2018",
				mileage: "50000",
				fuel: "Hybrid",
				color: "White",
				price: 18000,
				description: "Spacious Sedan with Low Mileage",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 1,
			},
			{
				isActive: false,
				brand: "Volkswagen",
				model: "Golf",
				year: "2014",
				mileage: "80000",
				fuel: "Electric",
				color: "Black",
				price: 22000,
				description: "Sporty Hatchback with Turbocharged Engine",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 1,
			},
			{
				isActive: true,
				brand: "Renault",
				model: "Kwid",
				year: "2019",
				mileage: "30000",
				fuel: "Gasoline",
				color: "Blue",
				price: 17000,
				description: "Compact Car with Low Mileage",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 3,
			},
			{
				isActive: true,
				brand: "Chevrolet",
				model: "Cruze",
				year: "2015",
				mileage: "70000",
				fuel: "Gasoline",
				color: "Silver",
				price: 20000,
				description: "New Description Announce",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 1,
			},
			{
				isActive: false,
				brand: "Ford",
				model: "Fiesta",
				year: "2012",
				mileage: "40000",
				fuel: "Diesel",
				color: "Red",
				price: 15000,
				description: "Used Car in Good Condition",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 1,
			},
			{
				isActive: true,
				brand: "Toyota",
				model: "Corolla",
				year: "2018",
				mileage: "50000",
				fuel: "Hybrid",
				color: "White",
				price: 18000,
				description: "Spacious Sedan with Low Mileage",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 3,
			},
			{
				isActive: true,
				brand: "Volkswagen",
				model: "Golf",
				year: "2014",
				mileage: "80000",
				fuel: "Electric",
				color: "Black",
				price: 22000,
				description: "Sporty Hatchback with Turbocharged Engine",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 1,
			},
			{
				isActive: false,
				brand: "Renault",
				model: "Kwid",
				year: "2019",
				mileage: "30000",
				fuel: "Gasoline",
				color: "Blue",
				price: 17000,
				description: "Compact Car with Low Mileage",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 1,
			},
			{
				isActive: true,
				brand: "Chevrolet",
				model: "Cruze",
				year: "2015",
				mileage: "70000",
				fuel: "Gasoline",
				color: "Silver",
				price: 20000,
				description: "New Description Announce",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 1,
			},
			{
				isActive: false,
				brand: "Chevrolet",
				model: "Cruze",
				year: "2015",
				mileage: "70000",
				fuel: "Gasoline",
				color: "Silver",
				price: 20000,
				description: "New Description Announce",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 1,
			},
			{
				isActive: true,
				brand: "Chevrolet",
				model: "Cruze",
				year: "2015",
				mileage: "70000",
				fuel: "Gasoline",
				color: "Silver",
				price: 20000,
				description: "New Description Announce",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 3,
			},
			{
				isActive: true,
				brand: "Chevrolet",
				model: "Cruze",
				year: "2015",
				mileage: "70000",
				fuel: "Gasoline",
				color: "Silver",
				price: 20000,
				description: "New Description Announce",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 3,
			},
			{
				isActive: false,
				brand: "Chevrolet",
				model: "Cruze",
				year: "2015",
				mileage: "70000",
				fuel: "Gasoline",
				color: "Silver",
				price: 20000,
				description: "New Description Announce",
				coverImage: "https://raw.githubusercontent.com/G9-fullstack/motorshop-app/f98a132cb61f680ab1561df9cf8ad60b3bd44409/public/example-car.png",
				sellerId: 1,
			}
		],
	});
}

main()
	.then(() => console.log("Done seeding database"))
	.catch(console.error)
	.finally(async () => await prisma.$disconnect());
