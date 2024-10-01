const db = new Map();

export class MiniDatabase {
  public insert(key: string, value: string) {
    db.set(key, value);
  }

  public find(key: string) {
    return db.get(key);
  }

  public exists(key: string) {
    return db.has(key);
  }

  public remove(key: string) {
    return db.delete(key);
  }

  public dump() {
    db.clear();
  }

  public get size() {
    return db.size;
  }
}
