import { Injectable } from "@nestjs/common";
import { AddressRepository } from "../address.repository";
import { PrismaService } from "src/server/prisma.service";
import { UpdateAddressDto } from "../../dto/update-address.dto";
import { Address } from "../../entities/address.entity";

@Injectable()
export class AddressPrismaRepository implements AddressRepository {
	constructor(private prisma: PrismaService) { }

	findOne(id: number): Promise<Address> {
		throw new Error("Method not implemented.");
	}

	update(id: number, data: UpdateAddressDto): Promise<Address> {
		throw new Error("Method not implemented.");
	}

}
