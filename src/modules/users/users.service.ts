/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConflictException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./repositories/user.repository";
import { randomUUID } from "node:crypto";
import { MailService } from "./sendEmail.service";
import { PrismaService } from "src/server/prisma.service";
import { hashSync } from "bcryptjs";

@Injectable()
export class UsersService {
	constructor(private userRepository: UserRepository, private mailService: MailService, private prisma: PrismaService)
	{}

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
		if (id !== userInfo.id) {
			throw new ForbiddenException();
		}

		console.log(updateUserDto);

		const userFound = await this.userRepository.findOne(id);

		if (!userFound) {
			throw new NotFoundException("User not found");
		}

		const emailExists = await this.userRepository.findByEmail(updateUserDto.email);
		const cpfExists = await this.userRepository.findByCpf(updateUserDto.cpf);
		const phoneNumberExists = await this.userRepository.findByPhoneNumber(updateUserDto.phoneNumber);



		if (emailExists && emailExists.id !== id && emailExists.id !== userFound.id) {
			throw new ConflictException("Email already exists");
		}
		if (cpfExists && cpfExists.id !== id && cpfExists.id !== userFound.id) {
			throw new ConflictException("CPF number already exists");
		}
		if (phoneNumberExists && phoneNumberExists.id !== id && phoneNumberExists.id !== userFound.id) {
			throw new ConflictException("Phone number already  exists");
		}

		delete updateUserDto.isSeller;
		//deletar tokenreset

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

	async sendEmailPassword(email: string) {

		const user = await this.findByEmail(email);

		if (!user) {
			throw new NotFoundException("Usuário não encontrado");
		}


		const tokenReset = randomUUID();

		await this.update(
			user.id,
			{...user, tokenReset,},
			user

		);

		const resetPasswordTemplate = this.mailService.resetPassword(
			email,
			user.name,
			tokenReset
		);
		await this.mailService.sendEmail(resetPasswordTemplate);
	}
	async resetPasswordOnDB(password: string, tokenReset: string) {

		const user = await this.prisma.user.findFirst({where: {tokenReset: tokenReset,},});

		//acha o usario pelo cmapo de reserte------- e em seguida faz o update,
		//o token de resete e aleatorio gerado la no frontented e enviado com parametro

		if (!user) {
			throw new NotFoundException("Usuário não encontrado");
		}

		const userInfo = {...user, password: hashSync(password, 10),};

		return await this.update(user.id, userInfo, user);
		//alter toke reset pra null
		//nao ta rasheando a senha


	}
}
