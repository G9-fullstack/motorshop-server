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
	Min,
	IsBoolean,
	IsOptional
} from "class-validator";

enum Brand {
	chevrolet = "chevrolet",
	citroen = "citroen",
	fiat = "fiat",
	ford = "ford",
	honda = "honda",
	hyundai = "hyundai",
	nissan = "nissan",
	peugeot = "peugeot",
	renault = "renault",
	toyota = "toyota",
	volkswagen = "volkswagen"
}

export class CreateAnnounceDto {
	@IsBoolean()
	@IsOptional()
		isActive: boolean;

	@IsString()
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
	@IsPositive()
	@Min(0)
		price: number;

	@IsString()
	@IsNotEmpty()
		description: string;

	@IsString()
	@IsNotEmpty()
		coverImage: string;
}
