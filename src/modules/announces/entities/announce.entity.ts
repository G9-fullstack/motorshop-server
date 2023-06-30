import { ApiProperty } from "@nestjs/swagger";

export class Announce {
	@ApiProperty({ description: "Announce's id", example: 1, })
	readonly id: number;

	@ApiProperty({ description: "Announce's is active", example: true, })
		isActive: boolean;

	@ApiProperty({ description: "Announce's brand", example: "Fiat", })
		brand: string;

	@ApiProperty({ description: "Announce's model", example: "Uno", })
		model: string;

	@ApiProperty({ description: "Announce's year", example: "2000", })
		year: string;

	@ApiProperty({ description: "Announce's mileage", example: "2000", })
		mileage: string;

	@ApiProperty({ description: "Announce's fuel", example: "Flex", })
		fuel: string;

	@ApiProperty({ description: "Announce's color", example: "Blue", })
		color: string;

	@ApiProperty({ description: "Announce's price", example: 10000, })
		price: number;

	@ApiProperty({ description: "Announce's description", example: "I'm a cool car", })
		description: string;

	@ApiProperty({ description: "Announce's cover image", example: "https://example.com/image.png", })
		coverImage: string;

	@ApiProperty({ example: "2021-01-01T00:00:00.000Z", description: "Created at's user", })
	readonly createdAt: Date;

	@ApiProperty({ example: "2021-01-02T00:00:00.000Z", description: "Updated at's user", })
	readonly updatedAt: Date;
}
