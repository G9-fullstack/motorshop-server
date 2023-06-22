import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { Request as ExpressRequest } from "express";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@UseGuards(JwtAuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersService.findOne(+id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @Request() req: ExpressRequest) {
		return this.usersService.update(+id, updateUserDto, req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string, @Request() req: ExpressRequest) {
		return this.usersService.remove(+id, req.user);
	}

	@Post("/alter-password")
	async sendEmailReset(@Body("email") email: string) {
		return this.usersService.sendEmailPassword(email);
	}

	@Patch("/resetPassword/:token")
	async resetPassword(
	@Param("token") token: string,
	@Body("password") password: string
	) {
		return this.usersService.resetPasswordOnDB(password, token);
	}
}
