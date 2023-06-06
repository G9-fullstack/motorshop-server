import { Injectable } from "@nestjs/common";
import { CreateAnnounceDto } from "./dto/create-announce.dto";
import { UpdateAnnounceDto } from "./dto/update-announce.dto";
import { AnnounceRepository } from "./repositories/announce.repository";

@Injectable()
export class AnnouncesService {
	constructor(private contactRepository: AnnounceRepository) {}

	async create(createAnnounceDto: CreateAnnounceDto) {
		return await this.contactRepository.create(createAnnounceDto);
	}

	async findAll() {
		return "This action returns all announces";
	}

	async findOne(id: number) {
		return `This action returns a #${id} announce`;
	}

	async update(id: number, updateAnnounceDto: UpdateAnnounceDto) {
		return `This action updates a #${id} announce`;
	}

	async remove(id: number) {
		return `This action removes a #${id} announce`;
	}
}
