import { SQLWrapper } from "drizzle-orm";
import { PgColumn, PgTable } from "drizzle-orm/pg-core";
import z from "zod";
import {
  FilterRuleGroupSchema,
  OrderDirection,
  OrderDirectionType,
} from "./FilterBuilder";
import { config } from "@/config";

export type ExtendedTable = PgTable & { id: SQLWrapper };
export type ID = string | number;
export type FindOptionsSQL = {
  where?: SQLWrapper;
  limit?: number;
  offset?: number;
  orderBy?: {
    column: PgColumn;
    direction: OrderDirectionType;
  }[];
};
export const FindOptionsSQLSchema = z
  .object({
    where: FilterRuleGroupSchema,
    limit: z.number().default(config.defaultPagination.limit),
    offset: z.number().default(config.defaultPagination.offset),
    orderBy: z.array(
      z.object({
        column: z.string(),
        direction: z.enum(OrderDirection),
      })
    ),
  })
  .partial();

export type FindOptions = z.infer<typeof FindOptionsSQLSchema>;
export interface IBaseRepository<TTable extends ExtendedTable> {
  // Queries
  findAll(options?: FindOptionsSQL): Promise<TTable["$inferSelect"][]>;
  findById(id: ID): Promise<TTable["$inferSelect"] | null>;
  findOne(where: SQLWrapper): Promise<TTable["$inferSelect"] | null>;
  findAndCount(
    options?: FindOptionsSQL
  ): Promise<[TTable["$inferSelect"][], number]>;
  count(where?: SQLWrapper): Promise<number>;
  checkExists(where: SQLWrapper): Promise<boolean>;
  checkExistsById(id: ID): Promise<boolean>;

  // Mutations - Create
  create(data: TTable["$inferInsert"]): Promise<TTable["$inferSelect"]>;
  createMany(data: TTable["$inferInsert"][]): Promise<TTable["$inferSelect"][]>;
  // Mutations - Update
  update(
    id: ID,
    data: Partial<TTable["$inferInsert"]>
  ): Promise<TTable["$inferSelect"] | null>;
  updateMany(
    data: (TTable["$inferInsert"] & { id: ID })[]
  ): Promise<TTable["$inferSelect"][]>;

  // Mutations - Delete
  delete(id: ID): Promise<void>;
  deleteMany(ids: ID[]): Promise<void>;
}
