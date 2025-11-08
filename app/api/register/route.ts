import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "../../../src/lib/dbConnect";
import User from "../../../src/models/user.model";

export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const { name, email, password } = await request.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
        }

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        return NextResponse.json({ success: true, message: 'User registered successfully' }, { status: 201 });
    }
    catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
