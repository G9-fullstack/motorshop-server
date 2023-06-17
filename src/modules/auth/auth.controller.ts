import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post("/login")
	@UseGuards(LocalAuthGuard)
	async login(@Body() user: LoginDto) {
		return this.authService.login(user.email);
	}

	@Get("/profile")
	@UseGuards(JwtAuthGuard)
	async getProfile(@Req() request: Request) {
		return await this.authService.validateToken(request.user);
	}
}
