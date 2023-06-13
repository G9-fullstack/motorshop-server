import { Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { compare } from "bcryptjs";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService) {}

	async validateUser(userEmail: string, userPassword: string): Promise<Pick<User, "email">> | null {
		const user = await this.usersService.findByEmail(userEmail);

		if (user) {
			const isValidPassword: boolean = await compare(userPassword, user.password);

			if (isValidPassword) {
				return { email: user.email, };
			}
		}

		return null;
	}
}
