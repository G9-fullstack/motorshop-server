import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class User {
	readonly id: number;
	@ApiProperty({ example: "John Doe", description: "Name's user",})
		name: string;
		@ApiProperty({ example: "jonhdoe@example.com", description: "Email's user",})
			email: string;
	@Exclude()
		password: string;
	@ApiProperty({ example: "12345678910", description: "CPF's user",})
		cpf: string;
	tokenReset?: string;
	@ApiProperty({ example: "123456789", description: "Phone number's user",})
		phoneNumber: string;
	@ApiProperty({ example: "1999-12-31", description: "Birthdate's user",})
		birthdate: string;
	@ApiProperty({ example: "I'm a cool guy", description: "Description's user",})
		description: string;
	@ApiProperty({ example: "true", description: "Is seller's user",})
		isSeller: boolean;
	@ApiProperty({ example: "2021-01-01T00:00:00.000Z", description: "Created at's user",})
	readonly createdAt: Date;
}
