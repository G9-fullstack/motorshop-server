import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "../../dto/create-comment.dto";
import { Comment } from "../../entities/comment.entity";
import { CommentRepository } from "../comment.repository";


@Injectable()
export class CommentPrismaRepository implements CommentRepository {
	async create(announceId: number, data: CreateCommentDto): Promise<Comment> {
		throw new Error("Method not implemented.");
	}

	async findAll(announceId: number): Promise<Comment[]> {
		throw new Error("Method not implemented.");
	}
}
