import { Transform, Type } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested, isString } from "class-validator";
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

	@IsOptional()
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		tokenReset: string;

	@IsBoolean()
	@IsOptional()
		isSeller: boolean;

	@ValidateNested()
	@Type(() => CreateAddressDto)
		address: CreateAddressDto;
}
