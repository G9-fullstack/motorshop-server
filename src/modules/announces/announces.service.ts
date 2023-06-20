/* eslint-disable @typescript-eslint/no-explicit-any */
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import "dotenv/config";
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

		return await this.announceRepository.create(createAnnounceDto, userInfo.id);
	}

	// async findAll(page: number) {
	// 	if (page <= 0 || !Number.isInteger(page)) {
	// 		page = 1;
	// 	}

	// 	const perPage = 12;

	// 	const announces = await this.announceRepository.findAll(page);

	// 	const count = await this.announceRepository.count();
	// 	const maxPage = Math.ceil(count/perPage);

	// 	//Remover essas duas linhas debaixo após o projeto subir para produção.
	// 	const PORT = process.env.APP_PORT || 3001;
	// 	baseUrl = baseUrl.concat(`:${PORT}`);

	// 	const prevPage = page === 1 || page > maxPage + 1 ? null : `${baseUrl}/users?page=${page - 1}&perPage=${perPage}`;
	// 	const nextPage = page >= maxPage ? null : `${baseUrl}/users?page=${page + 1}&perPage=${perPage}`;

	// 	return {
	// 		prevPage,
	// 		nextPage,
	// 		count,
	// 		data: announces,
	// 	};
	// }
	async findAll(page = 1, limit = 12) {
		const skip = (page - 1) * limit;
		const { data, totalCount, } = await this.announceRepository.findAll(skip, limit);

		const totalPages = Math.ceil(totalCount / limit);
		const baseUrl = `http://localhost:${process.env.APP_PORT || 3001}/announces`;
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
