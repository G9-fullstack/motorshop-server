import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./repositories/user.repository";

@Injectable()
export class UsersService {
	constructor(private userRepository: UserRepository) {}

	create(createUserDto: CreateUserDto) {
		return "This action adds a new user";
	}

	findAll() {
		return "This action returns all users";
	}

	findOne(id: number) {
		return `This action returns a #${id} user`;
	}

	async findByEmail(email: string) {
		const user = await this.userRepository.findByEmail(email);

		return user;
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
