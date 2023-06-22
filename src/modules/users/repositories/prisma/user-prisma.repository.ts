import { Injectable } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
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

	async findOne(id: number): Promise<User> {
		return await this.prisma.user.findFirst({ where: { id, }, include: { address: true, }, });
	}

	// async findByToken(tokenReset: string): Promise<User> {
	// 	return await this.prisma.user.findUnique({
	// 		where: {tokenReset, },
	// 	});
	// }

	async update(id: number, data: Partial<UpdateUserDto>): Promise<User> {
		const updatedUser = await this.prisma.user.update({
			where: {id,},
			data,
		});

		return plainToInstance(User, updatedUser);
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
		await this.prisma.user.delete({where: { id, }, });
	}
}

