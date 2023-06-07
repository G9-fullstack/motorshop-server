import { Injectable } from "@nestjs/common";
import { AnnounceRepository } from "../announce.repository";
import { CreateAnnounceDto } from "../../dto/create-announce.dto";
import { UpdateAnnounceDto } from "../../dto/update-announce.dto";
import { Announce } from "../../entities/announce.entity";
import { PrismaService } from "src/server/prisma.service";

@Injectable()
export class AnnouncePrismaRepository implements AnnounceRepository {
	constructor(private prisma: PrismaService) {}

	async create(data: CreateAnnounceDto): Promise<Announce> {
		const announce: Announce = new Announce();
		Object.assign(announce, { ...data, });

		const newAnnounce = await this.prisma.announce.create({
			data: {
				...announce,
			},
		});
		return newAnnounce;
	}

	async findAll(): Promise<Announce[]> {
		throw new Error("Method not implemented.");
	}

	async findOne(id: number): Promise<Announce> {
		const announce = await this.prisma.announce.findUnique({
			where: { id, },
		});
		return announce;
	}

	async update(id: number, data: UpdateAnnounceDto): Promise<Announce> {
		const announce = await this.prisma.announce.update({
			where: {id,},
			data,
		});
		return announce;
	}

	async remove(id: number): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
