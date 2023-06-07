import { Transform } from "class-transformer";
import {
	IsString,
	IsNotEmpty,
	IsEnum,
	MaxLength,
	Length,
	IsInt,
	IsNumberString,
	IsPositive,
	IsNumber,
	IsBoolean,
	IsOptional
} from "class-validator";

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
	@IsBoolean()
	@IsOptional()
		isActive: boolean;

	@IsNotEmpty()
	@IsEnum(Brand)
		brand: Brand;

	@IsString()
	@IsNotEmpty()
	@MaxLength(127)
		model: string;

	@IsNumberString()
	@IsNotEmpty()
	@Length(4)
		year: string;

	@IsNumberString()
	@IsNotEmpty()
	@MaxLength(10)
		mileage: string;

	@IsInt()
	@IsPositive()
	@IsNotEmpty()
		fuel: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(25)
		color: string;

	@IsNumber()
	@IsNotEmpty()
	@Transform(({ value, }) => Number(parseFloat(value).toFixed(2)))
		price: number;

	@IsString()
	@IsNotEmpty()
		description: string;

	@IsString()
	@IsNotEmpty()
		coverImage: string;
}
