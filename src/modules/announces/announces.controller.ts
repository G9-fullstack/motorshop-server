import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { AnnouncesService } from "./announces.service";
import { CreateAnnounceDto } from "./dto/create-announce.dto";
import { UpdateAnnounceDto } from "./dto/update-announce.dto";

@Controller("announces")
export class AnnouncesController {
	constructor(private readonly announcesService: AnnouncesService) { }

	@Post()
	create(@Body() createAnnounceDto: CreateAnnounceDto) {
		return this.announcesService.create(createAnnounceDto);
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
