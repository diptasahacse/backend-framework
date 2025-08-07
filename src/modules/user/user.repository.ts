import { UserTable } from "./user.schema";
import { BaseRepository } from "@/framework/core/BaseRepository";

export class UserRepository extends BaseRepository<typeof UserTable> {}
