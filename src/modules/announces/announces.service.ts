import { Injectable } from "@nestjs/common";
import { CreateAnnounceDto } from "./dto/create-announce.dto";
import { UpdateAnnounceDto } from "./dto/update-announce.dto";

@Injectable()
export class AnnouncesService {
	create(createAnnounceDto: CreateAnnounceDto) {
		return "This action adds a new announce";
	}

	findAll() {
		return "This action returns all announces";
	}

	findOne(id: number) {
		return `This action returns a #${id} announce`;
	}

	update(id: number, updateAnnounceDto: UpdateAnnounceDto) {
		return `This action updates a #${id} announce`;
	}

	remove(id: number) {
		return `This action removes a #${id} announce`;
	}
}
