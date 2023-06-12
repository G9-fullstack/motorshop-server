import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

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
		password: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(11)
		cpf: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(11)
		phoneNumber: string;

	@IsDate()
		birthdate: Date;

	@IsString()
	@IsNotEmpty()
		description: string;

	@IsBoolean()
	@IsOptional()
		isSeller: boolean;
}
