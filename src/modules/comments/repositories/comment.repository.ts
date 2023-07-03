import { CreateCommentDto } from "../dto/create-comment.dto";
import { Comment } from "../entities/comment.entity";

export abstract class CommentRepository {
	abstract create(userId: number, data: CreateCommentDto, announceId: number): Promise<Comment>
	abstract findAll(announceId: number): Promise<Comment[]>
	abstract findOne(commentId: number): Promise<Comment & { user: { id: number } }>
	abstract delete(commentId: number): Promise<void>
}
