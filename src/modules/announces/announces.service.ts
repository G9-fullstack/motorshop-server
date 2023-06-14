/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { CreateAnnounceDto } from "./dto/create-announce.dto";
import { UpdateAnnounceDto } from "./dto/update-announce.dto";
import { AnnounceRepository } from "./repositories/announce.repository";

@Injectable()
export class AnnouncesService {
	constructor(private announceRepository: AnnounceRepository) { }

	async create(createAnnounceDto: CreateAnnounceDto, userInfo: any) {
		if (!userInfo.isSeller) {
			throw new ForbiddenException();
		}

		return await this.announceRepository.create(createAnnounceDto, +userInfo.id);
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

	async update(id: number, updateAnnounceDto: UpdateAnnounceDto, userInfo: any) {
		if (!userInfo.isSeller) {
			throw new ForbiddenException();
		}

		const findAnnounce = await this.announceRepository.findOne(id);

		if (!findAnnounce) {
			throw new NotFoundException("Announce not found");
		}

		if (findAnnounce.sellerId !== userInfo.id) {
			throw new ForbiddenException();
		}

		const announce = await this.announceRepository.update(id, updateAnnounceDto);
		return announce;
	}

	async remove(id: number, userInfo: any) {
		if (!userInfo.isSeller) {
			throw new ForbiddenException();
		}

		const findAnnounce = await this.announceRepository.findOne(id);

		if (!findAnnounce) {
			throw new NotFoundException("Announce not found");
		}

		if (findAnnounce.sellerId !== userInfo.id) {
			throw new ForbiddenException();
		}

		await this.announceRepository.remove(id);
	}
}
