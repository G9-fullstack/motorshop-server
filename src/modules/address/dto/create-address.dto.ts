import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAddressDto {

  @ApiProperty({ type: "string", example: "12345678", description: "Zip code", })
  @IsString()
  @IsNotEmpty()
  	zipCode: string;

  @ApiProperty({ type: "string", example: "SP", description: "State", })
  @IsString()
  @IsNotEmpty()
  	state: string;

  @ApiProperty({ type: "string", example: "São Paulo", description: "City", })
  @IsString()
  @IsNotEmpty()
  	city: string;

  @ApiProperty({ type: "string", example: "Rua dos Bobos", description: "Street", })
  @IsString()
  @IsNotEmpty()
  	street: string;

  @ApiProperty({ type: "string", example: "123", description: "Number", })
  @IsString()
  @IsNotEmpty()
  	number: string;

  @ApiProperty({ type: "string", example: "Casa", description: "Complement", })
  @IsString()
  @IsOptional()
  	complement?: string;
}
