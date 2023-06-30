import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class Address {
	@ApiProperty({ type: "integer", example: 1, description: "Id", })
	readonly id: number;

	@ApiProperty({ type: "string", example: "12345678", description: "Zip code", })
		zipCode: string;

	@ApiProperty({ type: "string", example: "SP", description: "State", })
		state: string;

	@ApiProperty({ type: "string", example: "São Paulo", description: "City", })
		city: string;

	@ApiProperty({ type: "string", example: "Rua dos Bobos", description: "Street", })
		street: string;

	@ApiProperty({ type: "string", example: "123", description: "Number", })
		number: string;

	@ApiPropertyOptional({ type: "string", example: "Casa", description: "Complement", })
		complement?: string;
}
