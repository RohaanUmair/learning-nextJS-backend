import { NextResponse } from 'next/server';

interface User {
    userId: number;
    username: string;
}

let users: User[] = [{ userId: 1, username: 'JohnDoe' }];

export async function GET() {
    return NextResponse.json({ users });
}

export async function POST(request: Request) {
    const { username }: { username: string } = await request.json();

    const userId = users.length + 1;

    const newUser: User = { userId, username };
    users.push(newUser);

    return NextResponse.json({ message: 'User added successfully', user: newUser }, { status: 201 });
}
