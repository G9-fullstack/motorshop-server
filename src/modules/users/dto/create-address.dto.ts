import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateAddressDto {
	@ApiProperty({ description: "Address's zip code", example: "12345678", minLength: 1, maxLength: 8, required: true, })
	@IsString()
	@IsNotEmpty()
		zipCode: string;

	@ApiProperty({ description: "Address's state", example: "SP", minLength: 1, maxLength: 2, required: true, })
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
