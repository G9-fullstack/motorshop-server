import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

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
			user: {
				id: user.id,
				name: user.name,
				isSeller: user.isSeller,
			},
			token: this.jwtService.sign({
				isSeller: user.isSeller,
			}, {
				subject: user.id.toString(),
			}),
		};
	}
}
