import { Controller, Post, Body, Request, UseGuards, Param, Delete, HttpCode, Get, Patch } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import * as Express from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Comment } from "./entities/comment.entity";
import { UpdateCommentDto } from "./dto/update-announce.dto";

class CommentResponseDto extends Comment {
	@ApiProperty({ description: "User ID", example: 2, })
		userId: number;
	@ApiProperty({ description: "Announce ID", example: 1, })
		announceId: number;
}

@ApiTags("comments")
@UseGuards(JwtAuthGuard)
@Controller("announces/:id/comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@ApiOperation({ summary: "Create a new comment", })
	@ApiCreatedResponse({ description: "Comment created successfully", type: CommentResponseDto, })
	@ApiBody({ type: CreateCommentDto, })
	@Post()
	create(@Request() req: Express.Request, @Body() createCommentDto: CreateCommentDto, @Param("id") id: string) {
		return this.commentsService.create(req.user, createCommentDto, +id);
	}

	@Get()
	findAll(@Param("id") id: string) {
		return this.commentsService.findAll(+id);
	}

	@Patch(":commentId")
	update(@Request() req: Express.Request, @Body() updateCommentDto: UpdateCommentDto, @Param("commentId") commentId: string) {
		return this.commentsService.update(req.user, +commentId, updateCommentDto);
	}

	@HttpCode(204)
	@Delete(":commentId")
	delete(@Request() req: Express.Request, @Param("commentId") commentId: string) {
		this.commentsService.delete(req.user, +commentId);
	}
}
