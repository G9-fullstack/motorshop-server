import { Module } from "@nestjs/common";
import { AnnouncesService } from "./announces.service";
import { AnnouncesController } from "./announces.controller";
import { AnnounceRepository } from "./repositories/announce.repository";
import { AnnouncePrismaRepository } from "./repositories/prisma/announce-prisma.repository";

@Module({
	controllers: [AnnouncesController],
	providers: [
		AnnouncesService,
		{
			provide: AnnounceRepository,
			useClass: AnnouncePrismaRepository,
		}
	],
})
export class AnnouncesModule {}
