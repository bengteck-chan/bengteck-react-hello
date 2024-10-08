// app/api/names/route.ts
import { NextResponse } from 'next/server';
import { createName } from './prismaTable';

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get('name');
  const image = formData.get('image');

  if( 'string' != typeof name || name.length < 1) {
    return NextResponse.json({ success: false, msg: 'name must be a required string' })
  }
  if( ! Buffer.isBuffer(image) ) {
    return NextResponse.json({ success: false, msg: 'image must be a required buffer' })
  }

  createName(name, image);
  // Save to database or storage

  return NextResponse.json({ success: true });
}
