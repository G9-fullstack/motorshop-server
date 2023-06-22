/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, NotFoundException, ForbiddenException } from "@nestjs/common";
import { CreateAnnounceDto } from "./dto/create-announce.dto";
import { UpdateAnnounceDto } from "./dto/update-announce.dto";
import { AnnounceRepository } from "./repositories/announce.repository";
import "dotenv/config";

@Injectable()
export class AnnouncesService {
	constructor(private announceRepository: AnnounceRepository) { }

	async create(createAnnounceDto: CreateAnnounceDto, userInfo: any) {
		if (!userInfo.isSeller) {
			throw new ForbiddenException();
		}

		return await this.announceRepository.create(createAnnounceDto, userInfo.id);
	}

	async findAll(url: string, page = 1, limit = 12) {
		const skip = (page - 1) * limit;
		const data = await this.announceRepository.findAll(skip, limit);

		const totalCount = data.length;
		const totalPages = Math.ceil(totalCount / limit);
		const baseUrl = `${url}:${process.env.APP_PORT || 3001}/announces`;
		const prevPage = page === 1 || page > totalPages + 1 ? null : `${baseUrl}?page=${page - 1}&perPage=${limit}`;
		const nextPage = page >= totalPages ? null : `${baseUrl}?page=${page + 1}&perPage=${limit}`;
		const currentPage = page;

		return {
			prevPage,
			nextPage,
			currentPage,
			totalCount,
			data,
		};
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
