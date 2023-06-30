import { IsNotEmpty, IsString } from "class-validator";

export class AlterPasswordDto {
@IsString()
@IsNotEmpty()
	to: string;

@IsString()
@IsNotEmpty()
	subject: string;

@IsString()
@IsNotEmpty()
	text: string;
}
