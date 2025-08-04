export interface IDatabaseClient<TClient> {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getClient(): TClient;
  isConnected(): boolean;
  executeQuery<T>(label: string, queryFn: (db: TClient) => Promise<T>): Promise<T>;
}


export type DatabaseConfig = {
    url: string;
    maxConnections?: number;
    idleTimeOut?: number;
    maxUses?: number;
    ssl?: boolean;
    connectionTimeout?: number;

}