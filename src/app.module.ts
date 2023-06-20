import { Module } from "@nestjs/common";
import { AnnouncesModule } from "./modules/announces/announces.module";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
	imports: [AnnouncesModule, UsersModule, AuthModule],
})
export class AppModule { }
