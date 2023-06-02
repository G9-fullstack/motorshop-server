import { Module } from "@nestjs/common";
import { AnnouncesService } from "./announces.service";
import { AnnouncesController } from "./announces.controller";

@Module({
	controllers: [AnnouncesController],
	providers: [AnnouncesService],
})
export class AnnouncesModule {}
