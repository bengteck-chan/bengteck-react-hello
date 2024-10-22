import { NextResponse, NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('From middleware.ts');
  // console.log('Request:', req.url);
  console.log('Request Headers:', req.headers);
  return NextResponse.next();
}