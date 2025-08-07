import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/drizzle/schema";

export type DrizzleClient = ReturnType<
  typeof drizzle<typeof schema>
>;

export interface IDatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getClient(): DrizzleClient;
  isConnected(): boolean;
  executeQuery<T>(
    label: string,
    queryFn: (db: DrizzleClient) => Promise<T>
  ): Promise<T>;
}

export type DatabaseConfig = {
  url: string;
  maxConnections?: number;
  idleTimeOut?: number;
  maxUses?: number;
  ssl?: boolean;
  connectionTimeout?: number;
};
