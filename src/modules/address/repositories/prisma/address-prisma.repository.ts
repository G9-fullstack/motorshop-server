import { Injectable } from "@nestjs/common";
import { AddressRepository } from "../address.repository";
import { PrismaService } from "src/server/prisma.service";
import { UpdateAddressDto } from "../../dto/update-address.dto";
import { Address } from "../../entities/address.entity";

@Injectable()
export class AddressPrismaRepository implements AddressRepository {
	constructor(private prisma: PrismaService) { }

	async findOne(id: number): Promise<Address> {
		throw new Error("Method not implemented.");
	}

	async update(id: number, data: UpdateAddressDto): Promise<Address> {
		const updatedAddress = await this.prisma.address.update({
			where: { id, },
			data,
		});

		return updatedAddress;
	}
}
