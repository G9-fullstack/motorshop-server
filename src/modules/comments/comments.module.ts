import { Module } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { PrismaService } from "src/server/prisma.service";
import { CommentRepository } from "./repositories/comment.repository";
import { CommentPrismaRepository } from "./repositories/prisma/comment-prisma.repository";

@Module({
	controllers: [CommentsController],
	providers: [
		CommentsService,
		PrismaService,
		{
			provide: CommentRepository,
			useClass: CommentPrismaRepository,
		}
	],
})
export class CommentsModule {}
