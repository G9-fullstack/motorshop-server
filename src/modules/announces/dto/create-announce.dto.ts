import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
	IsString,
	IsNotEmpty,
	IsEnum,
	MaxLength,
	Length,
	IsNumberString,
	IsPositive,
	IsNumber,
	IsBoolean,
	IsOptional,
	IsArray
} from "class-validator";

enum Fuel {
	FLEX = "Flex",
	HIBRIDO = "Híbrido",
	ELETRICO = "Elétrico"
}

enum Brand {
	CHEVROLET = "chevrolet",
	CITROEN = "citroen",
	FIAT = "fiat",
	FORD = "ford",
	HONDA = "honda",
	HYUNDAI = "hyundai",
	NISSAN = "nissan",
	PEUGEOT = "peugeot",
	RENAULT = "renault",
	TOYOTA = "toyota",
	VOLKSWAGEN = "volkswagen"
}

export class CreateAnnounceDto {
	@ApiProperty({ description: "Announce's is active", example: true, })
	@IsBoolean()
	@IsOptional()
		isActive: boolean;

	@ApiProperty({ description: "Announce's brand", example: "Fiat", })
	@IsNotEmpty()
	@IsEnum(Brand)
		brand: Brand;

	@ApiProperty({ description: "Announce's model", example: "Uno", maxLength: 127, })
	@IsString()
	@IsNotEmpty()
	@MaxLength(127)
		model: string;

	@ApiProperty({ description: "Announce's year", example: "2000", minLength: 4, maxLength: 4, })
	@IsNumberString()
	@IsNotEmpty()
	@Length(4)
		year: string;


	@ApiProperty({ description: "Announce's mileage", example: "2000", maxLength: 10, })
	@IsNumberString()
	@IsNotEmpty()
	@MaxLength(10)
		mileage: string;

	@ApiProperty({ description: "Announce's fuel", example: "Flex", })
	@IsNotEmpty()
	@IsEnum(Fuel)
		fuel: Fuel;

	@ApiProperty({ description: "Announce's color", example: "Blue", maxLength: 25, })
	@IsString()
	@IsNotEmpty()
	@MaxLength(25)
		color: string;

	@ApiProperty({ description: "Announce's price", example: 1000.00, })
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	@Transform(({ value, }) => Number(parseFloat(value).toFixed(2)))
		price: number;

	@ApiProperty({ description: "Announce's description", example: "I'm a cool car", })
	@IsString()
	@IsNotEmpty()
		description: string;

	@ApiProperty({ description: "Announce's cover image", example: "https://example.com/image.png", })
	@IsString()
	@IsNotEmpty()
		coverImage: string;

	@ApiProperty({ description: "Announce's images", example: ["https://example.com/image.png"], })
	@IsOptional()
	@IsArray()
		images: string[];
}
