import { Module } from "@nestjs/common";
import { AddressService } from "./address.service";
import { AddressController } from "./address.controller";
import { AddressRepository } from "./repositories/address.repository";
import { PrismaService } from "src/server/prisma.service";
import { AddressPrismaRepository } from "./repositories/prisma/address-prisma.repository";

@Module({
	controllers: [AddressController],
	providers: [
		AddressService,
		PrismaService,
		{
			provide: AddressRepository,
			useClass: AddressPrismaRepository,
		}
	],
})
export class AddressModule {}
