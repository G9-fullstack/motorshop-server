import { Module } from "@nestjs/common";
import { AnnouncesService } from "./announces.service";
import { AnnouncesController } from "./announces.controller";
import { AnnounceRepository } from "./repositories/announce.repository";
import { AnnouncePrismaRepository } from "./repositories/prisma/announce-prisma.repository";
import { PrismaService } from "src/server/prisma.service";

@Module({
	controllers: [AnnouncesController],
	providers: [
		AnnouncesService,
		PrismaService,
		{
			provide: AnnounceRepository,
			useClass: AnnouncePrismaRepository,
		}
	],
})
export class AnnouncesModule {}
