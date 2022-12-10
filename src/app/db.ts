import Dexie, { Table } from 'dexie';

export interface StopStat {
  id?: number;
  groupId: string;
  name: string;
  useCount: number;
  lastUse: number;
}

export class AppDB extends Dexie {
  stopStats!: Table<StopStat, number>;
  constructor() {
    super('TTSSWebClient');
    this.version(1).stores({
      stopStats: '++id,groupId,name,useCount,lastUse'
    });
  }
}

export const db = new AppDB();
