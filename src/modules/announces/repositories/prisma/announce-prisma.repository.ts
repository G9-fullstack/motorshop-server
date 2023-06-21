import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/server/prisma.service";
import { CreateAnnounceDto } from "../../dto/create-announce.dto";
import { UpdateAnnounceDto } from "../../dto/update-announce.dto";
import { Announce } from "../../entities/announce.entity";
import { AnnounceRepository } from "../announce.repository";

@Injectable()
export class AnnouncePrismaRepository implements AnnounceRepository {
	constructor(private prisma: PrismaService) { }

	async create(data: CreateAnnounceDto, sellerId: number): Promise<Announce> {
		const { images, ...announce } = data;

		const imagesList = images ? images.map((image) => {
			return {
				imageUrl: image,
			};
		}) : undefined;

		const createDataOptions = {
			...announce,
			sellerId,
			images: {
				createMany: {
					data: imagesList,
				},
			},
		};

		if (!imagesList || !imagesList[0]) {
			delete createDataOptions.images;
		}

		const newAnnounce = await this.prisma.announce.create({
			data: createDataOptions,
			include: {
				images: {
					select: {
						imageUrl: true,
					},
				},
			},
		});
		return newAnnounce;
	}

	async findAll(skip: number, take: number): Promise<Announce[]> {
		const results = await this.prisma.announce.findMany({
			include: {
				images: {
					select: {
						imageUrl: true,
					},
				},
				seller: true,
			},
			skip,
			take,
			where: {
				isActive: true,
			},
		});
		return results;
	}

	async findOne(id: number): Promise<Announce & { sellerId: number }> {
		const announce = await this.prisma.announce.findUnique({
			where: { id, },
			include: {
				images: {
					select: {
						imageUrl: true,
					},
				},
			},
		});
		return announce;
	}

	async count(): Promise<number> {
		return await this.prisma.announce.count();
	}

	async update(id: number, data: UpdateAnnounceDto): Promise<Announce> {
		const { images, ...announce } = data;

		const imagesList = images ? images.map((image) => {
			return {
				imageUrl: image,
			};
		}) : undefined;

		const createDataOptions = {
			...announce,
			images: {
				deleteMany: {},
				createMany: {
					data: imagesList,
				},
			},
		};

		if (!imagesList || !imagesList[0]) {
			delete createDataOptions.images;
		}

		const updatedAnnounce = await this.prisma.announce.update({
			where: { id, },
			data: createDataOptions,
			include: {
				images: {
					select: {
						imageUrl: true,
					},
				},
			},
		});
		return updatedAnnounce;
	}

	async remove(id: number): Promise<void> {
		await this.prisma.announce.delete({ where: { id, }, });
	}
}
