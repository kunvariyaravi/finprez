// pages/api/ipopost/[slug].js
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
  const { iposlug } = params;

  try {
    const post = await prisma.ipopost.findUnique({
      where: { iposlug },
    });

    if (!post) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found" }, { status: 404 })
      );
    }

    return new NextResponse(JSON.stringify(post, null, 2), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
