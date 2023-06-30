import { ApiProperty } from "@nestjs/swagger";

export class Comment {
	@ApiProperty({ description: "Comment's id", example: 1, })
	readonly id: number;

	@ApiProperty({ description: "User comment on an announcement", example: "I've owned a previous model from this brand, and it has been incredibly reliable", } )
		comment: string;

	@ApiProperty({ example: "2023-06-29T00:00:00.000Z", description: "Created at comments", })
	readonly createdAt: Date;
}
