import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { hashSync } from "bcryptjs";
import { CreateAddressDto } from "./create-address.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
	@ApiProperty({ description: "User's name", example: "John Doe", minLength: 1, maxLength: 127, required: true, })
	@IsString()
	@IsNotEmpty()
	@MaxLength(127)
		name: string;

	@ApiProperty({ description: "User's email", example: "jonhdoe@example.com", minLength: 1, maxLength: 127, required: true, })
	@IsEmail()
	@IsNotEmpty()
	@MaxLength(127)
		email: string;

	@ApiProperty({ description: "User's password", example: "123456", required: true, })
	@IsString()
	@IsNotEmpty()
	@Transform(({ value, }: { value: string }) => hashSync(value, 10), {
		groups: ["transform"],
	})
		password: string;

	@ApiProperty({ description: "User's CPF number", example: "12345678901", minLength: 1, maxLength: 11, required: true, })
	@IsString()
	@IsNotEmpty()
	@MaxLength(11)
		cpf: string;

	@ApiProperty({ description: "User's phone number", example: "12345678901", minLength: 1, maxLength: 11, required: true, })
	@IsString()
	@IsNotEmpty()
	@MaxLength(11)
		phoneNumber: string;

	@ApiProperty({ description: "User's birthdate", example: "2000-01-01", minLength: 1, maxLength: 10, required: true, })
	@IsString()
	@IsNotEmpty()
	@MaxLength(10)
		birthdate: string;

	@ApiProperty({ description: "User's description", example: "I'm a cool guy", minLength: 1, maxLength: 255, required: true, })
	@IsString()
	@IsNotEmpty()
		description: string;

	@IsOptional()
		tokenReset: string;

	@ApiProperty({ description: "User's isSeller", example: true, required: true, })
	@IsBoolean()
	@IsOptional()
		isSeller: boolean;

	@ApiProperty({ description: "User's address", example: { street: "Rua dos Bobos", number: 0, complement: "Apto 13", city: "São Paulo", state: "SP", country: "Brasil", zipCode: "12345678", }, required: true, })
	@ValidateNested()
	@Type(() => CreateAddressDto)
		address: CreateAddressDto;
}
