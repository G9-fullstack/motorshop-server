import { Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { User } from "../../entities/user.entity";
import { PrismaService } from "src/server/prisma.service";

@Injectable()
export class UserPrismaRepository implements UserRepository {
	constructor(private prisma: PrismaService) {}
	findAll(): Promise<User[]> {
		throw new Error("Method not implemented.");
	}
	findOne(id: number): Promise<User> {
		throw new Error("Method not implemented.");
	}
	update(id: number, data: Partial<UpdateUserDto>): Promise<User> {
		throw new Error("Method not implemented.");
	}
	delete(id: number): Promise<void> {
		throw new Error("Method not implemented.");
	}
	async create(data: CreateUserDto): Promise<User> {
		const {address, ...user} = data;
		const userCreated = await this.prisma.user.create({
			data: {
				address: {
					create: {
						...address,
					},
				},
				...user,
				birthdate: new Date(user.birthdate),
			},
			include: {address: true,},
		});

		return userCreated;
	}}

