import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from "@nestjs/common";
import { Request as ExpressRequest } from "express";
import { AnnouncesService } from "./announces.service";
import { CreateAnnounceDto } from "./dto/create-announce.dto";
import { UpdateAnnounceDto } from "./dto/update-announce.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("announces")
export class AnnouncesController {
	constructor(private readonly announcesService: AnnouncesService) { }

	@Post()
	create(@Body() createAnnounceDto: CreateAnnounceDto, @Request() req: ExpressRequest) {
		return this.announcesService.create(createAnnounceDto, req.user);
	}

	@Get()
	findAll() {
		return this.announcesService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.announcesService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateAnnounceDto: UpdateAnnounceDto, @Request() req: ExpressRequest) {
		return this.announcesService.update(+id, updateAnnounceDto, req.user);
	}

	@Delete(":id")
	remove(@Param("id") id: string, @Request() req: ExpressRequest) {
		return this.announcesService.remove(+id, req.user);
	}
}
