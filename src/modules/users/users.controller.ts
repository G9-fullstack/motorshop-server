import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import * as Express from "express";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get(":id/infos")
	async getInfo(@Param("id") id: string) {
		return await this.usersService.getInfo(+id);
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

	@Get(":id/announces")
	async findAnnounces(
		@Request() req: Express.Request,
		@Param("id") id: string,
		@Query("page") page = 1,
		@Query("perPage") limit = 12
	) {
		return await this.usersService.findAnnounces(+id, Number(page), Number(limit));
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @Request() req: Express.Request) {
		return this.usersService.update(+id, updateUserDto, req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string, @Request() req: Express.Request) {
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
