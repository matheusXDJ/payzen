import { NextRequest, NextResponse } from "next/dist/server/web/spec-extension/request";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET - Get current user's phone number
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, whatsappPhone: true },
    });

    return NextResponse.json({ phoneNumber: user?.whatsappPhone });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH - Save/update user's phone number
export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { phoneNumber } = await req.json();

    if (phoneNumber && !/^\+\d{10,15}$/.test(phoneNumber)) {
      return NextResponse.json({ error: "Invalid phone number. Use international format: +5511999999999" }, { status: 400 });
    }

    // Check if phone is already in use
    if (phoneNumber) {
      const existing = await prisma.user.findFirst({
        where: { whatsappPhone: phoneNumber, NOT: { id: session.user.id } },
      });
      if (existing) {
        return NextResponse.json({ error: "This phone number is already linked to another account." }, { status: 400 });
      }
    }

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { whatsappPhone: phoneNumber || null },
    });

    return NextResponse.json({ phoneNumber: user.whatsappPhone });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
