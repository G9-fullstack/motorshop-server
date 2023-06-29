import { Controller, Post, Body, Request, UseGuards, Param } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import * as Express from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Comment } from "./entities/comment.entity";

@ApiTags("comments")
@UseGuards(JwtAuthGuard)
@Controller("announces/:id/comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@ApiOperation({ summary: "Create a new comment", })
	@ApiCreatedResponse({ description: "Comment created successfully", type: Comment, })
	@ApiBody({ type: CreateCommentDto, })
	@Post()
	create(@Request() req: Express.Request, @Body() createCommentDto: CreateCommentDto, @Param("id") id: string) {
		return this.commentsService.create(req.user, createCommentDto, +id);
	}
}
