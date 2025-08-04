import { DatabaseConfig, IDatabaseClient } from "../IDatabaseClient";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/drizzle/schema";

type DrizzleClient<TSchema extends Record<string, unknown>> = ReturnType<
  typeof drizzle<TSchema>
>;

export class DrizzleDatabaseClientPool<TSchema extends Record<string, unknown>>
  implements IDatabaseClient<DrizzleClient<TSchema>>
{
  private readonly pool: Pool;
  private client: DrizzleClient<TSchema>;
  private connected = false;

  constructor(config: DatabaseConfig, schema: TSchema) {
    this.pool = new Pool({
      connectionString: config.url,
      max: config.maxConnections ?? 1,
      idleTimeoutMillis: config.idleTimeOut ?? 30000,
      connectionTimeoutMillis: config.connectionTimeout ?? 10000,
      maxUses: config.maxUses ?? 10,
      ssl: config.ssl ?? false,
    });
    this.client = drizzle({
      client: this.pool,
      schema: schema,
    });
  }
  async connect() {
    if (this.connected) {
      return;
    }

    await this.pool.connect();
    this.connected = true;
    console.log("Connected to database");
  }
  async disconnect() {
    if (!this.connected) {
      return;
    }
    await this.pool.end();
    this.connected = false;
    console.log("Disconnected from database");
  }
  getClient() {
    return this.client;
  }
  isConnected() {
    return this.connected;
  }
  async executeQuery<T>(
    label: string,
    queryFn: (db: DrizzleClient<TSchema>) => Promise<T>
  ) {
    const start = performance.now();
    try {
      const result = await queryFn(this.client);
      const duration = (performance.now() - start).toFixed(2);
      console.log(`Query [${label}] executed in ${duration}ms`);
      return result;
    } catch (error) {
      const duration = (performance.now() - start).toFixed(2);
      console.error(`Error executing query [${label}]: in ${duration}ms`);
      console.error(error);
      throw new Error(`[${label}] Database query failed`);
    }
  }
}

export const test = async () => {
  const dbClient = new DrizzleDatabaseClientPool<typeof schema>(
    {
      url: process.env.DATABASE_URL!,
    },
    schema
  );
  const data = await dbClient.executeQuery("Find all users", async (db) => {
    return await db.query.UserTable.findMany();
  });
  //   const data =  await db.query.UserTable.findMany();
  console.log(data);
};
