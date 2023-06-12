import { Module } from "@nestjs/common";
import { AnnouncesModule } from "./modules/announces/announces.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
	imports: [AnnouncesModule, UsersModule],
})
export class AppModule {}
