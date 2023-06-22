/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./repositories/user.repository";

@Injectable()
export class UsersService {
	constructor(private userRepository: UserRepository) {}

	async create(createUserDto: CreateUserDto) {
		const emailExists = await this.userRepository.findByEmail(createUserDto.email);
		const cpfExists = await this.userRepository.findByCpf(createUserDto.cpf);
		const phoneNumberExists = await this.userRepository.findByPhoneNumber(createUserDto.phoneNumber);

		if(emailExists){
			throw new ConflictException("Email already exists");
		}
		if(cpfExists){
			throw new ConflictException("CPF number already exists");
		}
		if(phoneNumberExists){
			throw new ConflictException("Phone number already  exists");
		}

		return await this.userRepository.create(createUserDto);
	}

	async getInfo(id: number) {
		const user = await this.userRepository.getInfo(id);
		if (!user) throw new NotFoundException("User not found");
		return user;
	}

	async findAll() {
		return "This action returns all users";
	}

	async findOne(id: number) {
		return await this.userRepository.findOne(id);
	}

	async findAnnounces(id: number, page = 1, limit = 12) {
		const user = await this.userRepository.findOne(id);
		if (!user.isSeller) throw new UnauthorizedException("User is not a seller");

		const skip = (page - 1) * limit;
		const data = await this.userRepository.findAnnounces(id, skip, limit);

		const totalCount = data.length;
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

	async findByEmail(email: string) {
		const user = await this.userRepository.findByEmail(email);

		return user;
	}

	async update(id: number, updateUserDto: UpdateUserDto, userInfo: any) {
		if (id !== userInfo.id) {
			throw new ForbiddenException();
		}

		const userFound = await this.userRepository.findOne(id);

		if (!userFound) {
			throw new NotFoundException("User not found");
		}

		const emailExists = await this.userRepository.findByEmail(updateUserDto.email);
		const cpfExists = await this.userRepository.findByCpf(updateUserDto.cpf);
		const phoneNumberExists = await this.userRepository.findByPhoneNumber(updateUserDto.phoneNumber);

		if (emailExists && emailExists.id !== userFound.id) {
			throw new ConflictException("Email already exists");
		}
		if (cpfExists && cpfExists.id !== userFound.id) {
			throw new ConflictException("CPF number already exists");
		}
		if (phoneNumberExists && phoneNumberExists.id !== userFound.id) {
			throw new ConflictException("Phone number already  exists");
		}

		delete updateUserDto.isSeller;

		return await this.userRepository.update(id, updateUserDto);
	}

	async remove(id: number, userInfo: any) {
		if (id !== userInfo.id) {
			throw new ForbiddenException();
		}

		const userFound = await this.userRepository.findOne(id);
		if (!userFound) {
			throw new NotFoundException("User not found");
		}

		await this.userRepository.delete(id);
	}
}
