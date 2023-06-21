import { Controller, Get, Body, Patch, Param } from "@nestjs/common";
import { AddressService } from "./address.service";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Controller("address")
export class AddressController {
	constructor(private readonly addressService: AddressService) {}

@Get(":id")
	findOne(@Param("id") id: string) {
		return this.addressService.findOne(+id);
	}

@Patch(":id")
update(@Param("id") id: string, @Body() updateAddressDto: UpdateAddressDto) {
	return this.addressService.update(+id, updateAddressDto);
}
}
