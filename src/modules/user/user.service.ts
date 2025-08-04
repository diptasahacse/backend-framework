import { db } from "@/drizzle/db";
import { CreateUserDTO } from "./user.dto";
import { UserTable } from "./user.schema";

export const createUser = async (payload: CreateUserDTO) => {
  try {
    const result = await db.insert(UserTable).values(payload);
    return result;
  } catch (error) {
    throw error;
  }
};
export const getUsers = async () => {
  try {
    const result = await db.select().from(UserTable);
    return result;
  } catch (error) {
    throw error;
  }
};
