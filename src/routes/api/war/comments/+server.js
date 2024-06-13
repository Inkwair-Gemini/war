import { json } from '@sveltejs/kit';
import { dbStore } from '$lib/db';

async function getDatabase() {
    return new Promise((resolve) => {
        dbStore.subscribe(value => {
            resolve(value.database);
        });
    });
}

export async function GET() {
    let db = await getDatabase();

    try {
        if (!db) {
            throw new Error('数据库连接未准备好');
        }

        const collection = db.collection('comments');
        const info = await collection.find().toArray();

        if (!info || info.length === 0) {
            return json([], { status: 200 });
        }

        return json(info);
    } catch (error) {
        console.error('获取数据失败', error);
        return json({ error: '服务器错误' }, { status: 500 });
    }
}

export async function POST({ request }) {
    let db = await getDatabase();

    try {
        if (!db) {
            throw new Error('数据库连接未准备好');
        }

        const { email, content } = await request.json();
        if (!email || !content) {
            return json({ error: '缺少必要的字段' }, { status: 400 });
        }

        const newComment = {
            email,
            content,
            time: new Date().toISOString()
        };

        const collection = db.collection('comments');
        const result = await collection.insertOne(newComment);

        if (!result.acknowledged) {
            return json({ error: '评论创建失败' }, { status: 500 });
        }

        return json({ message: '评论创建成功', comment: newComment }, { status: 201 });
    } catch (error) {
        console.error('创建评论失败', error);
        return json({ error: '服务器错误' }, { status: 500 });
    }
}