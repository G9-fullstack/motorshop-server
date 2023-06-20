import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./repositories/user.repository";

@Injectable()
export class UsersService {
	constructor(private userRepository: UserRepository) { }

	async create(createUserDto: CreateUserDto) {
		const emailExists = await this.userRepository.findByEmail(createUserDto.email);
		const cpfExists = await this.userRepository.findByCpf(createUserDto.cpf);
		const phoneNumberExists = await this.userRepository.findByPhoneNumber(createUserDto.phoneNumber);

		if (emailExists) {
			throw new ConflictException("Email already exists");
		}
		if (cpfExists) {
			throw new ConflictException("CPF number already exists");
		}
		if (phoneNumberExists) {
			throw new ConflictException("Phone number already  exists");
		}

		return await this.userRepository.create(createUserDto);
	}

	async findAll() {
		return "This action returns all users";
	}

	async findAnnounces(id: number, page = 1, limit = 12) {
		const skip = (page - 1) * limit;
		const { data, totalCount, } = await this.userRepository.findAnnounces(id, skip, limit);

		const totalPages = Math.ceil(totalCount / limit);
		const baseUrl = `http://localhost:${process.env.APP_PORT || 3001}/users/${id}/announces`;
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
		return await this.userRepository.findOne(id);
	}

	async findByEmail(email: string) {
		const user = await this.userRepository.findByEmail(email);

		return user;
	}

	async getInfo(id: number) {
		const user = await this.userRepository.getInfo(id);
		if (!user) return { message: "User not found", };
		return user;
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	async remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
