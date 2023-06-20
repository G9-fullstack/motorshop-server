import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from "@nestjs/common";
import { Request as ExpressRequest } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { AnnouncesService } from "./announces.service";
import { CreateAnnounceDto } from "./dto/create-announce.dto";
import { UpdateAnnounceDto } from "./dto/update-announce.dto";


@Controller("announces")
export class AnnouncesController {
	constructor(private readonly announcesService: AnnouncesService) { }

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Body() createAnnounceDto: CreateAnnounceDto, @Request() req: ExpressRequest) {
		return this.announcesService.create(createAnnounceDto, req.user);
	}

	// @Get()
	// findAll(@Request() req: ExpressRequest, @Query() paginationParams: { page: string }) {
	// 	const baseUrl = req.protocol.concat("://").concat(req.hostname);

	// 	const page = Number(paginationParams.page) || 1;

	// 	return this.announcesService.findAll(baseUrl, page);
	// }
	@Get()
	async findAll(
		@Query("page") page = 1,
		@Query("perPage") limit = 12
	) {
		return await this.announcesService.findAll(Number(page), Number(limit));
	}

	@UseGuards(JwtAuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.announcesService.findOne(+id);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateAnnounceDto: UpdateAnnounceDto, @Request() req: ExpressRequest) {
		return this.announcesService.update(+id, updateAnnounceDto, req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string, @Request() req: ExpressRequest) {
		return this.announcesService.remove(+id, req.user);
	}
}
