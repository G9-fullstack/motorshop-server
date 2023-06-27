/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CommentRepository } from "./repositories/comment.repository";

@Injectable()
export class CommentsService {
	constructor(private commentRepository: CommentRepository) { }

	async create(userInfo: any, createCommentDto: CreateCommentDto, announceId: number ) {
		return await this.commentRepository.create(userInfo.id, createCommentDto, announceId);
	}
}
