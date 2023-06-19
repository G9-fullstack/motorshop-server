import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) { }

	async validateUser(userEmail: string, userPassword: string) {
		const user = await this.usersService.findByEmail(userEmail);

		if (user) {
			const isValidPassword: boolean = await compare(userPassword, user.password);

			if (isValidPassword) {
				return {
					id: user.id,
					name: user.name,
					email: user.email,
					isSeller: user.isSeller,
				};
			}
		}

		return null;
	}

	async login(email: string) {
		const user = await this.usersService.findByEmail(email);

		return {

			token: this.jwtService.sign({
				isSeller: user.isSeller,
			}, {
				subject: user.id.toString(),
			}),
		};
	}

	async validateToken(user: any) {
		const userFound = await this.usersService.findOne(user.id);
		return {
			id: userFound.id,
			name: userFound.name,
			description: userFound.description,
			isSeller: userFound.isSeller,
		};
	}
}
