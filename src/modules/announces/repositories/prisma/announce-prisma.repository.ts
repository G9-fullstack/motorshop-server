import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/server/prisma.service";
import { CreateAnnounceDto } from "../../dto/create-announce.dto";
import { UpdateAnnounceDto } from "../../dto/update-announce.dto";
import { Announce } from "../../entities/announce.entity";
import { AnnounceRepository } from "../announce.repository";

@Injectable()
export class AnnouncePrismaRepository implements AnnounceRepository {
	constructor(private prisma: PrismaService) { }

	async create(data: CreateAnnounceDto): Promise<Announce> {
		const announce: Announce = new Announce();
		Object.assign(announce, { ...data, });

		const newAnnounce = await this.prisma.announce.create({
			data: {
				...announce,
				sellerId: 3,
			},
		});
		return newAnnounce;
	}

	async findAll(): Promise<Announce[]> {
		const contacts = await this.prisma.announce.findMany();
		return contacts;
	}

	async findOne(id: number): Promise<Announce> {
		const announce = await this.prisma.announce.findUnique({
			where: { id, },
		});
		return announce;
	}

	async update(id: number, data: UpdateAnnounceDto): Promise<Announce> {
		const announce = await this.prisma.announce.update({
			where: { id, },
			data,
		});
		return announce;
	}

	async remove(id: number): Promise<void> {
		await this.prisma.announce.delete({ where: { id, }, });
	}
}
