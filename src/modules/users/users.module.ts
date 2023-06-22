import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { PrismaService } from "src/server/prisma.service";
import { UserRepository } from "./repositories/user.repository";
import { UserPrismaRepository } from "./repositories/prisma/user-prisma.repository";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailService } from "./sendEmail.service";

@Module({
	imports: [MailerModule.forRoot({
		transport: {
			host: "smtp.gmail.com",
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		},
		defaults: {
			from: "nathanrpessoal.7@gmail.com",
		},
	})],
	controllers: [UsersController],
	providers: [
		UsersService,
		PrismaService,
		MailService,
		{
			provide: UserRepository,
			useClass: UserPrismaRepository,
		}

	],
	exports: [UsersService],
})
export class UsersModule {}
