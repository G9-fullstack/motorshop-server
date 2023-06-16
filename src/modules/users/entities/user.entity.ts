import { Exclude } from "class-transformer";

export class User {
	readonly id: number;
	name: string;
	email: string;

	@Exclude()
		password: string;

	cpf: string;
	phoneNumber: string;
	birthdate: string;
	description: string;
	isSeller: boolean;
	readonly createdAt: Date;
}
