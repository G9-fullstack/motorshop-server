/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateAddressDto } from "./dto/update-address.dto";
import { AddressRepository } from "./repositories/address.repository";

@Injectable()
export class AddressService {
	constructor(private addressRepository: AddressRepository) { }

	async findOne(userInfo: any) {
		const findAddress = await this.addressRepository.findOne(userInfo.id);
		if (!findAddress) {
			throw new NotFoundException("Address not found");
		}
		return findAddress;
	}

	async update(updateAddressDto: UpdateAddressDto, userInfo: any) {

		const findAddress = await this.addressRepository.findOne(userInfo.id);

		if (!findAddress) {
			throw new NotFoundException("Address not found");
		}

		return await this.addressRepository.update(userInfo.id, updateAddressDto);
	}
}
