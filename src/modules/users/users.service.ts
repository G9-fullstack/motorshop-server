import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
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

	async findAll() {
		return "This action returns all users";
	}

	async findOne(id: number) {
		return await this.userRepository.findOne(id);
	}

	async findByEmail(email: string) {
		const user = await this.userRepository.findByEmail(email);

		return user;
	}


	async update(id: number, updateUserDto: UpdateUserDto, userInfo: any) {
		return `This action updates a #${id} user`;
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
