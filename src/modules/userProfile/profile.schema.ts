import { pgTable, uuid, text, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "../user/user.schema";

export const ProfileTable = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => UserTable.id),
  bio: text("bio"),
  avatarUrl: varchar("avatar_url", { length: 500 }),
});
