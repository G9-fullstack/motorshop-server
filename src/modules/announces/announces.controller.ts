import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request, Query } from "@nestjs/common";
import { AnnouncesService } from "./announces.service";
import { CreateAnnounceDto } from "./dto/create-announce.dto";
import { UpdateAnnounceDto } from "./dto/update-announce.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import * as Express from "express";

@UseGuards(JwtAuthGuard)
@Controller("announces")
export class AnnouncesController {
	constructor(private readonly announcesService: AnnouncesService) { }

	@Post()
	create(@Body() createAnnounceDto: CreateAnnounceDto, @Request() req: Express.Request) {
		return this.announcesService.create(createAnnounceDto, req.user);
	}

	@Get()
	async findAll(
		@Request() req: Express.Request,
		@Query("page") page = 1,
		@Query("perPage") limit = 12
	) {
		const baseUrl: string = req.protocol.concat("://").concat(req.hostname);
		return await this.announcesService.findAll(baseUrl, Number(page), Number(limit));
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.announcesService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateAnnounceDto: UpdateAnnounceDto, @Request() req: Express.Request) {
		return this.announcesService.update(+id, updateAnnounceDto, req.user);
	}

	@Delete(":id")
	remove(@Param("id") id: string, @Request() req: Express.Request) {
		return this.announcesService.remove(+id, req.user);
	}
}
