import { Injectable } from "@nestjs/common";
import { UpdateAddressDto } from "./dto/update-address.dto";

@Injectable()
export class AddressService {
	findOne(id: number) {
		return `This action returns a #${id} address`;
	}

	update(id: number, updateAddressDto: UpdateAddressDto) {
		return `This action updates a #${id} address`;
	}
}
