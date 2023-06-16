import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator";
import { hashSync } from "bcryptjs";
import { CreateAddressDto } from "./create-address.dto";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(127)
		name: string;

	@IsEmail()
	@IsNotEmpty()
	@MaxLength(127)
		email: string;

	@IsString()
	@IsNotEmpty()
	@Transform(({ value, }: { value: string }) => hashSync(value, 10), {
		groups: ["transform"],
	})
		password: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(11)
		cpf: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(11)
		phoneNumber: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(10)
		birthdate: string;

	@IsString()
	@IsNotEmpty()
		description: string;

	@IsBoolean()
	@IsOptional()
		isSeller: boolean;

	@ValidateNested()
	@Type(() => CreateAddressDto)
		address: CreateAddressDto;
}
