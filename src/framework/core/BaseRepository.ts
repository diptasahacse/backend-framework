import { IDatabaseClient } from "../lib/IDatabaseClient";
import { ExtendedTable, FindOptionsSQL, IBaseRepository } from "./IBaseRepository";

export abstract class BaseRepository<TTable extends ExtendedTable,  TSchema extends Record<string, unknown>>
  implements IBaseRepository<TTable>
{
  constructor(
    protected readonly db: IDatabaseClient<TSchema>,
    protected readonly table: TTable
  ) {}
  // Queries
  //  async findAll(options?: FindOptionsSQL){

  //   const result  = await this.db.executeQuery("Find all users", async (db) => {
  //     const query = db.select().from(this.table).$dynamic();
  //   });

    }
    // findById(id: ID): Promise<TTable["$inferSelect"] | null>;
    // findOne(where: SQLWrapper): Promise<TTable["$inferSelect"] | null>;
    // findAndCount(where?: SQLWrapper): Promise<[TTable["$inferSelect"][], number]>;
    // count(where?: SQLWrapper): Promise<number>;
    // checkExists(where: SQLWrapper): Promise<boolean>;
  
    // // Mutations - Create
    // create(data: TTable["$inferInsert"]): Promise<TTable["$inferSelect"]>;
    // createMany(data: TTable["$inferInsert"][]): Promise<TTable["$inferSelect"][]>;
    // // Mutations - Update
    // update(
    //   id: ID,
    //   data: Partial<TTable["$inferInsert"]>
    // ): Promise<TTable["$inferSelect"]>;
    // updateMany(
    //   data: (TTable["$inferInsert"] & { id: ID })[]
    // ): Promise<TTable["$inferSelect"][]>;
  
    // // Mutations - Delete
    // delete(id: ID): Promise<void>;
    // deleteMany(ids: ID[]): Promise<void>;

}
