import { Module } from "@nestjs/common";
import { AnnouncesModule } from "./modules/announces/announces.module";
import { UsersModule } from "./modules/users/users.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AddressModule } from "./modules/address/address.module";

@Module({
	imports: [AnnouncesModule, UsersModule, AuthModule, AddressModule],
})
export class AppModule {}
