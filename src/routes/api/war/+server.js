import { json } from '@sveltejs/kit';
import { dbStore } from '$lib/db';
import { ObjectId } from 'mongodb'; // 引入 ObjectId

export async function GET() {
    let db;
    const unsubscribe = dbStore.subscribe(value => {
        db = value.database;
    });

    // 等待数据库连接完成
    while (!db) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    try {
        if (!db) {
            throw new Error('数据库连接未准备好');
        }

        // 执行数据库操作，例如获取数据
        // @ts-ignore
        const collection = db.collection('basic_info');
        const info = await collection.findOne({ _id: new ObjectId('666ad6112bcd054114e7390a') });

        unsubscribe(); // 取消订阅，确保不会造成内存泄漏

        if (!info) {
            return json({ error: '未找到相关信息' }, { status: 404 });
        }

        return json(info);
    } catch (error) {
        console.error('获取数据失败', error);
        return json({ error: '服务器错误' }, { status: 500 });
    }
}
