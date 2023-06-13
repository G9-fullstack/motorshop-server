import { Injectable } from "@nestjs/common";
import { UserRepository } from "../user.repository";
import { CreateUserDto } from "../../dto/create-user.dto";
import { UpdateUserDto } from "../../dto/update-user.dto";
import { User } from "../../entities/user.entity";
import { PrismaService } from "src/server/prisma.service";

@Injectable()
export class UserPrismaRepository implements UserRepository {
	constructor(private prisma: PrismaService) {}
	async create(data: CreateUserDto): Promise<User> {
		throw new Error("Method not implemented.");
	}
	async findAll(): Promise<User[]> {
		throw new Error("Method not implemented.");
	}
	async findOne(id: number): Promise<User> {
		throw new Error("Method not implemented.");
	}
	async findByEmail(email: string): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: { email, },
		});

		return user;
	}
	async update(id: number, data: UpdateUserDto): Promise<User> {
		throw new Error("Method not implemented.");
	}
	async delete(id: number): Promise<void> {
		throw new Error("Method not implemented.");
	}
}
