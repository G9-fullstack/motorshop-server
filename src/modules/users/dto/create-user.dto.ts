import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { hashSync } from "bcryptjs";

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

	@IsDate()
		birthdate: Date;

	@IsString()
	@IsNotEmpty()
		description: string;

	@IsBoolean()
	@IsOptional()
		isSeller: boolean;
}
