import { config } from "@/config";
import { BaseRepository } from "./BaseRepository";
import { FilterBuilder, OrderDirectionType } from "./FilterBuilder";
import { ExtendedTable, FindOptions, ID } from "./IBaseRepository";
import { PgColumn } from "drizzle-orm/pg-core";

export abstract class BaseService<
  TTable extends ExtendedTable,
  TRepository extends BaseRepository<TTable> = BaseRepository<TTable>
> {
  constructor(protected readonly repository: TRepository) {}

  async findAll(options: FindOptions) {
    this.catchError(async () => {
      const filter = options.where
        ? FilterBuilder.build(options.where)
        : undefined;
      const result = await this.repository.findAll({
        where: filter,
        limit: options.limit ?? config.defaultPagination.limit,
        offset: options.offset ?? config.defaultPagination.offset,
        orderBy: this.transformOrderBy(options.orderBy),
      });
      if (!result) {
        throw new Error("Not found");
      }

      return result;
    });

    return "Will do later";
  }

  async findById(id: ID) {
    this.catchError(async () => {
      const result = await this.repository.findById(id);
      if (!result) {
        throw new Error("Not found");
      }

      return result;
    });
  }

  async create(data: TTable["$inferInsert"]) {
    return this.catchError(async () => await this.repository.create(data));
  }

  async update(id: ID, data: Partial<TTable["$inferInsert"]>) {
    return this.catchError(async () => {
      const result = await this.repository.update(id, data);
      if (!result) {
        throw new Error("Not found");
      }
      return result;
    });
  }
  async updateMany(data: (TTable["$inferInsert"] & { id: ID })[]) {
    return this.catchError(() => this.repository.updateMany(data));
  }
  // Mutations - Delete
  async delete(id: ID) {
    return this.catchError(() => this.repository.delete(id));
  }

  async deleteMany(ids: ID[]) {
    return this.catchError(() => this.repository.deleteMany(ids));
  }

  async checkExists(id: ID) {
    return this.catchError(() => this.repository.findById(id));
  }

  async handleError(error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(typeof error === "string" ? error : "Unknown error");
  }

  protected async catchError(callBack: () => Promise<unknown>) {
    try {
      await callBack();
    } catch (error) {
      this.handleError(error);
    }
  }

  protected transformOrderBy(orderBy: FindOptions["orderBy"]) {
    if (!orderBy) {
      return undefined;
    }
    const table = this.repository.gettable();
    return orderBy
      .filter((order) => order.column in table)
      .map((order) => {
        return {
          column: table[order.column as keyof typeof table] as PgColumn,
          direction: order.direction as OrderDirectionType,
        };
      });
  }
}
