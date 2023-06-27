import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
	@ApiProperty({ type: "string", example: "jonhdoe@example.com", description: "Email", })
	@IsEmail()
	@IsNotEmpty()
		email: string;

	@ApiProperty({ type: "string", example: "123456", description: "Password", })
	@IsString()
	@IsNotEmpty()
		password: string;
}
