import { CreateAnnounceDto } from "../dto/create-announce.dto";
import { UpdateAnnounceDto } from "../dto/update-announce.dto";
import { Announce } from "../entities/announce.entity";

export abstract class AnnounceRepository {
	abstract create(data: CreateAnnounceDto, sellerId: number): Promise<Announce>;
	abstract findAll(): Promise<Announce[] | object>;
	abstract findOne(id: number): Promise<Announce | undefined>;
	abstract update(id: number, data: UpdateAnnounceDto): Promise<Announce> | Announce;
	abstract remove(id: number): Promise<void>;
}
