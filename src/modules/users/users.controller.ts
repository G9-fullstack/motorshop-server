import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import * as Express from "express";
import { ApiAcceptedResponse, ApiBearerAuth, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, OmitType, PartialType, getSchemaPath } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Announce } from "../announces/entities/announce.entity";

@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@ApiOperation({ summary: "Create a user", })
	@ApiCreatedResponse({ description: "User created successfully", type: User, })
	@ApiConflictResponse({ description: "Email already exists | CPF number already exists | Phone number already  exists", })
	@ApiBody({ type: CreateUserDto, })
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@ApiOperation({ summary: "Get all users", })
	@ApiOkResponse({ description: "Users retrieved successfully", })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@ApiOperation({ summary: "Get user information", })
	@ApiOkResponse({
		description: "User information retrieved successfully", schema: {
			type: "object",
			properties: {
				id: { type: "number", example: 1, },
				name: { type: "string", example: "John Doe", },
				description: { type: "string", example: "I'm a cool guy", },
			},
		},
	})
	@ApiParam({ name: "id", type: String, })
	@Get(":id/infos")
	async getInfo(@Param("id") id: string) {
		return await this.usersService.getInfo(+id);
	}

	@ApiOperation({ summary: "Get a user by ID", })
	@ApiAcceptedResponse({ description: "User retrieved successfully", type: User, })
	@ApiParam({ name: "id", type: String, })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersService.findOne(+id);
	}

	@ApiOperation({ summary: "Update a user", })
	@ApiOkResponse({ description: "User updated successfully", type: User, })
	@ApiForbiddenResponse({ description: "Forbidden", })
	@ApiNotFoundResponse({ description: "User not found", })
	@ApiConflictResponse({ description: "Email already exists | CPF number already exists | Phone number already  exists", })
	@ApiParam({ name: "id", type: String, })
	@ApiBody({ type: PartialType(OmitType(CreateUserDto, ["address"])), })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto, @Request() req: Express.Request) {
		return this.usersService.update(+id, updateUserDto, req.user);
	}

	@ApiOperation({ summary: "Get user announces", })
	@ApiOkResponse({
		description: "User announces retrieved successfully", schema: {
			type: "object",
			properties: {
				prevPage: { type: "string", example: "http://localhost:3000/users/1/announces?page=1&perPage=1", },
				nextPage: { type: "string", example: "http://localhost:3000/users/1/announces?page=3&perPage=1", },
				currentPage: { type: "number", example: 2, },
				totalPages: { type: "number", example: 3, },
				data: {
					type: "array",
					items: {
						$ref: getSchemaPath(Announce), example: {
							id: 1,
							isActive: true,
							brand: "Fiat",
							model: "Uno",
							year: 2010,
							price: 10000,
							createdAt: "2021-06-28T00:00:00.000Z",
						},
					},
				},
			},
		},
	})
	@ApiParam({ name: "id", type: String, })
	@ApiQuery({ name: "page", type: Number, required: false, })
	@ApiQuery({ name: "perPage", type: Number, required: false, })
	@Get(":id/announces")
	async findAnnounces(
		@Request() req: Express.Request,
		@Param("id") id: string,
		@Query("page") page = 1,
		@Query("perPage") limit = 12
	) {
		return await this.usersService.findAnnounces(+id, Number(page), Number(limit));
	}

	@ApiOperation({ summary: "Delete a user", })
	@ApiNoContentResponse({ description: "User deleted successfully", })
	@ApiForbiddenResponse({ description: "Forbidden", })
	@ApiNotFoundResponse({ description: "User not found", })
	@ApiParam({ name: "id", type: String, })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string, @Request() req: Express.Request) {
		return this.usersService.remove(+id, req.user);
	}

	@ApiOperation({ summary: "Send password reset email", })
	@ApiOkResponse({ description: "Email sent successfully", })
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				email: { type: "string", example: "jonhdoe@example.com", },
			},
		},
	})
	@ApiNotFoundResponse({ description: "User not found", })
	@Post("/alter-password")
	async sendEmailReset(@Body("email") email: string) {
		return this.usersService.sendEmailPassword(email);
	}

	@ApiOperation({ summary: "Reset user password", })
	@ApiOkResponse({ description: "Password reset successfully", type: User, })
	@ApiNotFoundResponse({ description: "User not found", })
	@ApiParam({ name: "token", type: String, })
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				password: { type: "string", example: "123456", },
			},
		},
	})
	@Patch("/resetPassword/:token")
	async resetPassword(
		@Param("token") token: string,
		@Body("password") password: string
	) {
		return this.usersService.resetPasswordOnDB(password, token);
	}
}
