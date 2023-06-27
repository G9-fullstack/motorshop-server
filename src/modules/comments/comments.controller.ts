import { Controller, Get, Post, Body, Request, UseGuards, Param } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ApiTags } from "@nestjs/swagger";
import * as Express from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("comments")
@UseGuards(JwtAuthGuard)
@Controller("comments")
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post(":id")
	create(@Request() req: Express.Request, @Body() createCommentDto: CreateCommentDto, @Param("id") id: string) {
		return this.commentsService.create(req.user, createCommentDto, +id);
	}

	@Get()
	async findAll() {
		return await this.commentsService.findAll();
	}
}
