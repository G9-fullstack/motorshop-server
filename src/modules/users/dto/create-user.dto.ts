import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, isNotEmpty } from "class-validator";
import { hashSync } from "bcryptjs";
import { Address } from "@prisma/client";


// export class CreateUserDto {
// 	@IsString()
// 	@IsNotEmpty()
// 	@MaxLength(127)
// 		name: string;

// 	@IsEmail()
// 	@IsNotEmpty()
// 	@MaxLength(127)
// 		email: string;

// 	@IsString()
// 	@IsNotEmpty()
// 	@Transform(({ value, }: { value: string }) => hashSync(value, 10), {
// 		groups: ["transform"],
// 	})
// 		password: string;

// 	@IsString()
// 	@IsNotEmpty()
// 	@MaxLength(11)
// 		cpf: string;

// 	@IsString()
// 	@IsNotEmpty()
// 	@MaxLength(11)
// 		phoneNumber: string;

// 	@IsString()
// 	@Matches(/^\d{2}\/\d{2}\/\d{2}$/, {
// 		message: "The date field should be in the format DD/MM/YY",
// 	})
// 		birthdate: string;

// 	@IsString()
// 	@IsNotEmpty()
// 		description: string;

// 	@IsBoolean()
// 	@IsOptional()
// 		isSeller: boolean;

// 	address:{
// 	zipCode: string,
// 	state: string,
// 	city: string,
// 	street: string,
// 	number: string,
// 	complement: string
// 	};
// }


export interface CreateUserDto {
	name: string;
	email: string;
	password: string;
	cpf: string;
	phoneNumber: string;
	birthdate: string;
	description: string;
	isSeller: boolean;
	address:{
	zipCode: string,
	state: string,
	city: string,
	street: string,
	number: string,
	complement: string
	};
}
