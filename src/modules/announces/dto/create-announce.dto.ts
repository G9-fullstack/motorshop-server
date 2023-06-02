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
	Min
} from "class-validator";

enum Brand {
	chevrolet,
	citroen,
	fiat,
	ford,
	honda,
	hyundai,
	nissan,
	peugeot,
	renault,
	toyota,
	volkswagen
}

export class CreateAnnounceDto {
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

	@IsString()
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
