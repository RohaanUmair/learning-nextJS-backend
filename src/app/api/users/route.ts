    import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
    try {
        await connectToDatabase();
        const users = await User.find({});
        return NextResponse.json({ users });
    } catch (error) {
        console.error('GET Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const { username } = await request.json();
        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        const newUser = new User({ username });
        await newUser.save();

        return NextResponse.json({ message: 'User added successfully', user: newUser }, { status: 201 });
    } catch (error) {
        console.error('POST Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
