import { CreateCommentDto } from "../dto/create-comment.dto";
import { Comment } from "../entities/comment.entity";

export abstract class CommentRepository {
	abstract create(announceId: number, data: CreateCommentDto): Promise<Comment>
	abstract findAll(announceId: number): Promise<Comment[]>
}
