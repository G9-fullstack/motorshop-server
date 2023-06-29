import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
	@ApiProperty({ description: "User comment on an announcement", example: "I've owned a previous model from this brand, and it has been incredibly reliable", } )
	@IsString()
	@IsNotEmpty()
		comment: string;
}
