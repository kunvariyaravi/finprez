
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const data = await prisma.ipopost.findMany({
      take:20
    });

    return NextResponse.json({ result: data, success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  } 
}
