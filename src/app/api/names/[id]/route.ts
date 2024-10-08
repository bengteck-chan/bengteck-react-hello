import { NextResponse } from 'next/server';
import { deleteNameById, getNameById, updateNameById } from '@/app/names/prismaTable';

export const GET = async (req: Request, { params }: { params: { id: number } }) => {
    try {
        const { id } = params;

        const name = await getNameById(id);
        if (!name) {
            return NextResponse.json({ error: 'Name not found' }, { status: 404 });
        }

        return NextResponse.json({
            name: name.name,
            image: Buffer.from(name.image).toString('base64')  // Convert binary image to base64 for frontend
        });
    } catch (error) {
        console.error('Error fetching name:', error);
        return NextResponse.json({ error: 'Error fetching name' }, { status: 500 });
    }
};

export const PUT = async (req: Request, { params }: { params: { id: number } }) => {
    try {
        const { id } = params;
        const form = await req.formData();
        const name = form.get('name') as string;

        const image = form.get('image') as File;
        const imageBuffer = image ? Buffer.from(await image.arrayBuffer()) : null;

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

        await updateNameById(id,name,imageBuffer)

        return NextResponse.json({ message: 'Name updated successfully' });
    } catch (error) {
        console.error('Error updating name:', error);
        return NextResponse.json({ error: 'Error updating name' }, { status: 500 });
    }
};

export const DELETE = async (req: Request, { params }: { params: { id: number } }) => {
    try {
        const { id } = params;

        await deleteNameById(id)

        return NextResponse.json({ message: 'Name deleted successfully' });
    } catch (error) {
        console.error('Error deleting name:', error);
        return NextResponse.json({ error: 'Error deleting name' }, { status: 500 });
    }
};