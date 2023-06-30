import { use } from "passport";
import { Announce } from "@prisma/client";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User>
  abstract getInfo(id: number): Promise<{ id: number, name: string, description: string }>
  abstract findAll(): Promise<User[]>
  abstract findOne(id: number): Promise<User>
  abstract findAnnounces(id: number, page: number, limit: number): Promise<{ count: number; results: Announce[] }>
  abstract findByEmail(email: string): Promise<User>;
  abstract findByCpf(cpf: string): Promise<User>;
  abstract findByPhoneNumber(phoneNumber: string): Promise<User>;
  abstract update(id: number, data: UpdateUserDto): Promise<User>
  abstract delete(id: number): Promise<void>
}
