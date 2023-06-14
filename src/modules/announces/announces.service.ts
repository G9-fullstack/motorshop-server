import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAnnounceDto } from "./dto/create-announce.dto";
import { UpdateAnnounceDto } from "./dto/update-announce.dto";
import { AnnounceRepository } from "./repositories/announce.repository";

@Injectable()
export class AnnouncesService {
	constructor(private announceRepository: AnnounceRepository) { }

	async create(createAnnounceDto: CreateAnnounceDto, sellerId: number) {
		return await this.announceRepository.create(createAnnounceDto, sellerId);
	}

	async findAll() {
		return this.announceRepository.findAll();
	}

	async findOne(id: number) {
		const announce = await this.announceRepository.findOne(id);
		if (!announce) {
			throw new NotFoundException("Announce not found");
		}
		return announce;
	}

	async update(id: number, updateAnnounceDto: UpdateAnnounceDto) {
		const findAnnounce = await this.announceRepository.findOne(id);
		if (!findAnnounce) {
			throw new NotFoundException("Announce not found");
		}
		const announce = await this.announceRepository.update(id, updateAnnounceDto);
		return announce;
	}

	async remove(id: number) {
		const announce = await this.announceRepository.findOne(id);
		if (!announce) {
			throw new NotFoundException(`Announce with ID "${id}" not found`);
		}
		await this.announceRepository.remove(id);
	}
}
