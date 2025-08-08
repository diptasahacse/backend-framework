export class Cache {
  private cache: Record<string, unknown> = {};
  get(key: string) {
    return this.cache[key];
  }
  set(key: string, value: unknown) {
    this.cache[key] = value;
  }
}
