import { createName, getAllNames } from '@/app/names/prismaTable';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
    try {
        const form = await req.formData();
        const name = form.get('name') as string;
        const image = form.get('image') as File;

        // Convert image to binary
        const imageBuffer = Buffer.from(await image.arrayBuffer());

        if("string" != typeof name || name.length < 1) {
            return NextResponse.json(
                { error: 'Name is required' }, // Descriptive error message
                { status: 400 }                // 400 Bad Request status
            );
        }

        if(! Buffer.isBuffer(imageBuffer)) {
            return NextResponse.json(
                { error: 'Image is required' }, // Descriptive error message
                { status: 400 }                // 400 Bad Request status
            );
        }

        await createName(name, imageBuffer)

        return NextResponse.json({ message: 'Name added successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error adding name:', error);
        return NextResponse.json({ error: 'Error adding name' }, { status: 500 });
    }
};

export const GET = async () => {
    try {

        // Fetch all names from the SQLite database
        const names = await getAllNames()

        return NextResponse.json(names);
    } catch (error) {
        console.error('Error fetching names:', error);
        return NextResponse.json({ error: 'Error fetching names' }, { status: 500 });
    }
};