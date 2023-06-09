import { CreateAnnounceDto } from "../dto/create-announce.dto";
import { UpdateAnnounceDto } from "../dto/update-announce.dto";
import { Announce } from "../entities/announce.entity";

export abstract class AnnounceRepository {
	abstract create(data: CreateAnnounceDto, sellerId: number): Promise<Announce>;
	abstract findAll(page: number, limit: number): Promise<{ count: number; results: Announce[] }>
	abstract findOne(id: number): Promise<Announce & { sellerId: number } | undefined>;
	abstract count(): Promise<number>
	abstract update(id: number, data: UpdateAnnounceDto): Promise<Announce> | Announce;
	abstract remove(id: number): Promise<void>;
}
