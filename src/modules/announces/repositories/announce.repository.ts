import { CreateAnnounceDto } from "../dto/create-announce.dto";
import { UpdateAnnounceDto } from "../dto/update-announce.dto";
import { Announce } from "../entities/announce.entity";

export abstract class AnnounceRepository {
	abstract create(data: CreateAnnounceDto): Promise<Announce>
	abstract findAll(): Promise<Announce[]>;
	abstract findOne(id: number): Promise<Announce>;
	abstract update(id: number, data: UpdateAnnounceDto): Promise<Announce>;
	abstract remove(id: number): Promise<void>;
}
