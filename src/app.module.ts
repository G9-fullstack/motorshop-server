import { Module } from "@nestjs/common";
import { AnnouncesModule } from "./modules/announces/announces.module";

@Module({
	imports: [AnnouncesModule],
})
export class AppModule {}
