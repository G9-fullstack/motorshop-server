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
		throw new Error("Method not implemented.");
	}

	async findAll(): Promise<Announce[]> {
		throw new Error("Method not implemented.");
	}

	async findOne(id: number): Promise<Announce> {
		throw new Error("Method not implemented.");
	}

	async update(id: number, data: UpdateAnnounceDto): Promise<Announce> {
		throw new Error("Method not implemented.");
	}

	async remove(id: number): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
