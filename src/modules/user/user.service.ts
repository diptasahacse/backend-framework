import { UserTable } from "./user.schema";
import { BaseService } from "@/framework/core/BaseService";
import { UserRepository } from "./user.repository";

export class UserService extends BaseService<
  typeof UserTable,
  UserRepository
> {
  
}
