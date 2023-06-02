import { Injectable } from "@nestjs/common";
import { AnnounceRepository } from "../announce.repository";
import { CreateAnnounceDto } from "../../dto/create-announce.dto";
import { UpdateAnnounceDto } from "../../dto/update-announce.dto";
import { Announce } from "../../entities/announce.entity";

@Injectable()
export class AnnouncePrismaRepository implements AnnounceRepository {
	create(data: CreateAnnounceDto): Promise<Announce> {
		throw new Error("Method not implemented.");
	}

	findAll(): Promise<Announce[]> {
		throw new Error("Method not implemented.");
	}

	findOne(id: number): Promise<Announce> {
		throw new Error("Method not implemented.");
	}

	update(id: number, data: UpdateAnnounceDto): Promise<Announce> {
		throw new Error("Method not implemented.");
	}

	remove(id: number): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
