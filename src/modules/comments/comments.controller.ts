import { Controller, Get, Post, Body } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";

@Controller("comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post()
	async create(@Body() createCommentDto: CreateCommentDto) {
		return await this.commentsService.create(createCommentDto);
	}

	@Get()
	async findAll() {
		return await this.commentsService.findAll();
	}
}
