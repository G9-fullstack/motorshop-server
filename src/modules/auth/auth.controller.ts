import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@ApiOkResponse({
		description: "User logged in successfully", schema: {
			type: "object",
			properties: {
				token: {
					type: "string",
					example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
				},
			},
		},
	})
	@ApiBody({ type: LoginDto, })
	@ApiBearerAuth()
	@UseGuards(LocalAuthGuard)
	@Post("/login")
	async login(@Body() user: LoginDto) {
		return this.authService.login(user.email);
	}

	@ApiOkResponse({
		description: "User profile retrieved successfully", schema: {
			type: "object",
			properties: {
				id: {
					type: "integer",
					example: 1,
				},
				name: {
					type: "string",
					example: "John Doe",
				},
				description: {
					type: "string",
					example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
				},
				isSeller: {
					type: "boolean",
					example: true,
				},
			},
		},
	})
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get("/profile")
	async getProfile(@Req() request: Request) {
		return await this.authService.validateToken(request.user);
	}



}
