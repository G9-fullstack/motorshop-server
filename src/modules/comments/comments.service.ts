/* eslint-disable @typescript-eslint/no-explicit-any */
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CommentRepository } from "./repositories/comment.repository";
import { UpdateCommentDto } from "./dto/update-announce.dto";

@Injectable()
export class CommentsService {
	constructor(private commentRepository: CommentRepository) { }

	async create(userInfo: any, createCommentDto: CreateCommentDto, announceId: number ) {
		return await this.commentRepository.create(userInfo.id, createCommentDto, announceId);
	}

	async findAll(announceId: number) {
		return await this.commentRepository.findAll(announceId);
	}

	async update(userInfo: any, commentId: number, data: UpdateCommentDto) {
		const comment = await this.commentRepository.findOne(commentId);

		if (!comment) {
			throw new NotFoundException("Comment not found");
		}

		if (comment.user.id !== userInfo.id) {
			throw new ForbiddenException();
		}

		return await this.commentRepository.update(commentId, data);
	}

	async delete(userInfo: any, commentId: number) {
		const comment = await this.commentRepository.findOne(commentId);

		if (!comment) {
			throw new NotFoundException("Comment not found");
		}

		if (comment.user.id !== userInfo.id) {
			throw new ForbiddenException();
		}

		await this.commentRepository.delete(commentId);
	}
}
