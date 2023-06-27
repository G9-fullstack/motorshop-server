import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request, Query } from "@nestjs/common";
import { AnnouncesService } from "./announces.service";
import { CreateAnnounceDto } from "./dto/create-announce.dto";
import { UpdateAnnounceDto } from "./dto/update-announce.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import * as Express from "express";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, PartialType, getSchemaPath } from "@nestjs/swagger";
import { Announce } from "./entities/announce.entity";

@ApiTags("announces")
@Controller("announces")
export class AnnouncesController {
	constructor(private readonly announcesService: AnnouncesService) { }

	@ApiCreatedResponse({ description: "Announce created successfully", type: Announce, })
	@ApiBody({ type: CreateAnnounceDto, })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createAnnounceDto: CreateAnnounceDto, @Request() req: Express.Request) {
		return this.announcesService.create(createAnnounceDto, req.user);
	}

	@ApiOkResponse({
		description: "Announces retrieved successfully", schema: {
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
	@Get()
	async findAll(
		@Request() req: Express.Request,
		@Query("page") page = 1,
		@Query("perPage") limit = 12
	) {
		const baseUrl: string = req.protocol.concat("://").concat(req.hostname);
		return await this.announcesService.findAll(baseUrl, Number(page), Number(limit));
	}

	@ApiOkResponse({ description: "Announce retrieved successfully", type: Announce, })
	@ApiNotFoundResponse({ description: "Announce not found", })
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.announcesService.findOne(+id);
	}

	@ApiOkResponse({ description: "Announce updated successfully", type: Announce, })
	@ApiNotFoundResponse({ description: "Announce not found", })
	@ApiForbiddenResponse({ description: "Forbidden", })
	@ApiParam({ name: "id", type: String, })
	@ApiBody({ type: PartialType(CreateAnnounceDto), })
	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateAnnounceDto: UpdateAnnounceDto, @Request() req: Express.Request) {
		return this.announcesService.update(+id, updateAnnounceDto, req.user);
	}

	@ApiNoContentResponse()
	@ApiNotFoundResponse({ description: "Announce not found", })
	@ApiParam({ name: "id", type: String, })
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string, @Request() req: Express.Request) {
		return this.announcesService.remove(+id, req.user);
	}
}
