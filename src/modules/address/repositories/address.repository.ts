import { UpdateAddressDto } from "../dto/update-address.dto";
import { Address } from "../entities/address.entity";

export abstract class AddressRepository {
  abstract update(id: number, data: UpdateAddressDto): Promise<Address>;
}
