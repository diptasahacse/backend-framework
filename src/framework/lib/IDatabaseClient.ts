import { drizzle } from "drizzle-orm/node-postgres";

export type DrizzleClient<TSchema extends Record<string, unknown>> = ReturnType<
  typeof drizzle<TSchema>
>;

export interface IDatabaseClient<TSchema extends Record<string, unknown>> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getClient(): DrizzleClient<TSchema>;
  isConnected(): boolean;
  executeQuery<T>(
    label: string,
    queryFn: (db: DrizzleClient<TSchema>) => Promise<T>
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
