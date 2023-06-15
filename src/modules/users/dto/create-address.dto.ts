import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateAddressDto {
	@IsString()
	@IsNotEmpty()
		zipCode: string;

	@IsString()
	@IsNotEmpty()
		state: string;

	@IsString()
	@IsNotEmpty()
		city: string;

	@IsString()
	@IsNotEmpty()
		street: string;

	@IsString()
	@IsNotEmpty()
		number: string;

	@IsOptional()
	@IsString()
		complement?: string;
}
