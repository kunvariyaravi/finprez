import prisma from "@/utils/connect";
import { NextResponse } from 'next/server';

// Create a single PrismaClient instance and reuse it
// const prisma = new PrismaClient();

export async function GET() {
  try {

    const data = await prisma.ipopost.findMany({
      take: 20,
    });

    return NextResponse.json({ result: data, success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
