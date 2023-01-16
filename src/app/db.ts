import Dexie, { Table } from 'dexie';

export interface StopStat {
  id?: number;
  groupId: string;
  name: string;
  useCount: number;
  lastUse: number;
  city: string;
}

export interface UserSetting {
  id?: number;
  name: string;
  value: any;
}

export class AppDB extends Dexie {
  stopStats!: Table<StopStat, number>;
  settings!: Table<UserSetting, number>;
  constructor() {
    super('TTSSWebClient');
    this.version(1).stores({
      stopStats: '++id,groupId,name,useCount,lastUse'
    });
    this.version(2).stores({
      stopStats: '++id,groupId,name,useCount,lastUse,city',
      settings: '++id,name'
    }).upgrade(tx => {
      tx.table("stopStats").toCollection().modify(stat => {
        stat.city = "krakow"
      })
    })
  }
}

export const db = new AppDB();
