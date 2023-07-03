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

	async findAll(announceId: number): Promise<Comment[]> {
		return await this.prismaService.comment.findMany({
			where: { announceId, },
		});
	}

	async findOne(commentId: number): Promise<Comment & { user: { id: number } }> {
		return await this.prismaService.comment.findUnique({
			where: {
				id: commentId,
			},
			include: {
				user: {
					select: {
						id: true,
					},
				},
			},
		});
	}

	async delete(commentId: number): Promise<void> {
		await this.prismaService.comment.delete({
			where: {
				id: commentId,
			},
		});
	}
}
