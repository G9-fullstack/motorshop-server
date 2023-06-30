import { Controller, Get, Body, Patch, Request, UseGuards } from "@nestjs/common";
import { AddressService } from "./address.service";
import { Request as ExpressRequest } from "express";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { ApiBearerAuth, ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags, PartialType } from "@nestjs/swagger";
import { Address } from "./entities/address.entity";
import { CreateAddressDto } from "./dto/create-address.dto";

@ApiTags("address")
@Controller("address")
export class AddressController {
	constructor(private readonly addressService: AddressService) { }

	@ApiOperation({ summary: "Create address", })
	@ApiOkResponse({ description: "Address retrieved successfully", type: Address, })
	@ApiNotFoundResponse({ description: "Address not found", })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	findOne(@Request() req: ExpressRequest) {
		return this.addressService.findOne(req.user);
	}

	@ApiOperation({ summary: "Update address", })
	@ApiOkResponse({ description: "Address updated successfully", type: Address, })
	@ApiNotFoundResponse({ description: "Address not found", })
	@ApiBody({ type: PartialType(CreateAddressDto), })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Patch()
	update(@Body() updateAddressDto: UpdateAddressDto, @Request() req: ExpressRequest) {
		return this.addressService.update(updateAddressDto, req.user);
	}
}
