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

	async findAll(baseUrl: string, page: number) {
		if (page <= 0 || !Number.isInteger(page)) {
			page = 1;
		}

		const perPage = 12;

		const announces = await this.announceRepository.findAll(page);

		const count = await this.announceRepository.count();
		const maxPage = Math.ceil(count/perPage);

		//Remover essas duas linhas debaixo após o projeto subir para produção.
		const PORT = process.env.APP_PORT || 3001;
		baseUrl = baseUrl.concat(`:${PORT}`);

		const prevPage = page === 1 || page > maxPage + 1 ? null : `${baseUrl}/users?page=${page - 1}&perPage=${perPage}`;
		const nextPage = page >= maxPage ? null : `${baseUrl}/users?page=${page + 1}&perPage=${perPage}`;

		return {
			prevPage,
			nextPage,
			count,
			data: announces,
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
