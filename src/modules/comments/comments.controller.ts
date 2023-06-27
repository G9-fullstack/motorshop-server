import { Controller, Get, Post, Body, Request, UseGuards, Param } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ApiTags } from "@nestjs/swagger";
import * as Express from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("comments")
@Controller("comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@UseGuards(JwtAuthGuard)
	@Post(":id")
	create(@Body() createCommentDto: CreateCommentDto, @Request() req: Express.Request, @Param("id") id: number) {
		return this.commentsService.create(createCommentDto, req.user, id);
	}

	@Get()
	async findAll() {
		return await this.commentsService.findAll();
	}
}


