import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "../../dto/create-comment.dto";
import { Comment } from "../../entities/comment.entity";
import { CommentRepository } from "../comment.repository";
import { PrismaService } from "src/server/prisma.service";


@Injectable()
export class CommentPrismaRepository implements CommentRepository {
	constructor(private prismaService: PrismaService) {}

	async create(userId: number, data: CreateCommentDto, announceId: number ): Promise<Comment> {
		const commentData = {
			user: { connect: { id: userId, }, },
			announce: { connect: { id: announceId, }, },
			comment: data.comment,
		};

		const commentCreated = await this.prismaService.comment.create({
			data: commentData,
		});

		return commentCreated;
	}
}
