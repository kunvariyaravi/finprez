
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET() {
  const prisma = new PrismaClient();

  try {
    console.log('Querying data from MongoDB...');
    const data = await prisma.ipopost.findMany({
      take:10
    });

    console.log('Found data:', data);

    return NextResponse.json({ result: data, success: true });
  } catch (error) {
    console.error('Error querying data from MongoDB:', error);

    return NextResponse.json({ success: false, error: error.message });
  } finally {
    await prisma.$disconnect();
    console.log('Prisma connection closed.');
  }
}
