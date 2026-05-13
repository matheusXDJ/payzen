import { NextRequest, NextResponse } from "next/dist/server/web/spec-extension/request";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@payzen/database";
import { createCategorySchema } from "@payzen/types";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const categories = await prisma.category.findMany({
      where: {
        userId: session.user.id,
        ...(type && { type: type as any }),
      },
      orderBy: { name: "asc" },
      include: {
        _count: { select: { transactions: true } }
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const json = await req.json();
    const body = createCategorySchema.parse(json);

    // Check unique name per type
    const existing = await prisma.category.findUnique({
      where: {
        userId_name_type: {
          userId: session.user.id,
          name: body.name,
          type: body.type,
        }
      }
    });

    if (existing) {
      return NextResponse.json({ error: "Category with this name already exists for this type" }, { status: 400 });
    }

    const category = await prisma.category.create({
      data: {
        userId: session.user.id,
        ...body,
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation Error", details: error.errors }, { status: 400 });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
