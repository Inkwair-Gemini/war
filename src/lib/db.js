import { writable } from 'svelte/store';
import { MongoClient } from 'mongodb';

const URL = "mongodb://localhost:27017/war";

const client = new MongoClient(URL);
/**
 * @type {import("mongodb").Db}
 */
let database;

async function connect(){
    try {
        if (!database) {
            await client.connect();
            database = client.db('war');
            // 连接成功后，更新全局状态
            // @ts-ignore
            dbStore.set({ client, database });
        }
    } catch (err) {
        console.error('MongoDB 连接失败', err);
    }
}

// 在初始化时连接数据库
connect();

// 导出全局状态
export const dbStore = writable({ client, database: null });
