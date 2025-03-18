import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  console.log("Received data:", { name, email, message });

  try {
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        message,
      },
    });
    console.log("Message saved:", contactMessage);

    return NextResponse.json(
      { message: "Message sent successfully", contactMessage },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
