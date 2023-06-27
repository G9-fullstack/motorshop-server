/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { CommentRepository } from "./repositories/comment.repository";

@Injectable()
export class CommentsService {
	constructor(private commentRepository: CommentRepository) { }

	async create(createCommentDto: CreateCommentDto, userInfo: any, announceId: any ) {
		return await this.commentRepository.create(userInfo.id, createCommentDto, announceId);
	}

	findAll() {
		return "This action returns all comments";
	}
}

