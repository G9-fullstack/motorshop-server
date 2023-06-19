import { Injectable } from "@nestjs/common";
import { Announce } from "@prisma/client";
import { plainToClass } from "class-transformer";
import { PrismaService } from "src/server/prisma.service";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { User } from "../../entities/user.entity";
import { UserRepository } from "../user.repository";

@Injectable()
export class UserPrismaRepository implements UserRepository {
	constructor(private prisma: PrismaService) { }

	async create(data: CreateUserDto): Promise<User> {
		const { address, ...user } = data;
		const userCreated = await this.prisma.user.create({
			data: {
				address: {
					create: {
						...address,
					},
				},
				...user,
			},
		});

		return plainToClass(User, userCreated);
	}

	async findAll(): Promise<User[]> {
		throw new Error("Method not implemented.");
	}

	async findAnnounces(id: number, skip: number, take: number): Promise<{ data: Announce[], totalCount: number }> {
		const [results, totalCount] = await Promise.all([
			this.prisma.announce.findMany({
				where: {
					sellerId: id,
				},
				include: {
					images: {
						select: {
							imageUrl: true,
						},
					},
				},
				skip,
				take,
			}),
			this.prisma.announce.count({
				where: {
					sellerId: id,
				},
			})
		]);

		return {
			data: results,
			totalCount,
		};
	}

	async getInfo(id: number) {
		const user = await this.prisma.user.findFirst({
			where: { id, },
			select: {
				id: true,
				name: true,
				description: true,
			},
		});

		return user;
	}

	async findOne(id: number): Promise<User> {
		return await this.prisma.user.findFirst({ where: { id, }, include: { address: true, }, });
	}

	async update(id: number, data: Partial<UpdateUserDto>): Promise<User> {
		throw new Error("Method not implemented.");
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { email, },
		});

		return user;
	}

	async findByCpf(cpf: string): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { cpf, },
		});

		return user;
	}

	async findByPhoneNumber(phoneNumber: string): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { phoneNumber, },
		});

		return user;
	}

	async delete(id: number): Promise<void> {
		throw new Error("Method not implemented.");
	}
}

function plainToIstance(user: { name: string; email: string; password: string; cpf: string; phoneNumber: string; birthdate: string; description: string; isSeller: boolean; }, userCreated: User): User | PromiseLike<User> {
	throw new Error("Function not implemented.");
}

