import { Controller, Get, Body, Patch, Request, UseGuards } from "@nestjs/common";
import { AddressService } from "./address.service";
import { Request as ExpressRequest } from "express";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("address")
export class AddressController {
	constructor(private readonly addressService: AddressService) {}

@UseGuards(JwtAuthGuard)
@Get()
	findOne(@Request() req: ExpressRequest ) {
		return this.addressService.findOne(req.user);
	}

@UseGuards(JwtAuthGuard)
@Patch()
update(@Body() updateAddressDto: UpdateAddressDto, @Request() req: ExpressRequest ) {
	return this.addressService.update(updateAddressDto, req.user);
}
}
