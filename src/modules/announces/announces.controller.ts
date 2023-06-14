import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Request } from "@nestjs/common";
import { AnnouncesService } from "./announces.service";
import { CreateAnnounceDto } from "./dto/create-announce.dto";
import { UpdateAnnounceDto } from "./dto/update-announce.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@UseGuards(JwtAuthGuard)
@Controller("announces")
export class AnnouncesController {
	constructor(private readonly announcesService: AnnouncesService) { }

	@Post()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	create(@Body() createAnnounceDto: CreateAnnounceDto, @Request() req: any) {
		return this.announcesService.create(createAnnounceDto, +req.user.id);
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
	update(@Param("id") id: string, @Body() updateAnnounceDto: UpdateAnnounceDto) {
		return this.announcesService.update(+id, updateAnnounceDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.announcesService.remove(+id);
	}
}
