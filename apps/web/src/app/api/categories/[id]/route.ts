import { NextRequest, NextResponse } from "next/dist/server/web/spec-extension/request";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@payzen/database";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const category = await prisma.category.findUnique({
      where: { id: params.id, userId: session.user.id },
      include: { _count: { select: { transactions: true } } }
    });

    if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
    if (category._count.transactions > 0) return NextResponse.json({ error: "Cannot delete category with transactions" }, { status: 400 });

    await prisma.category.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
