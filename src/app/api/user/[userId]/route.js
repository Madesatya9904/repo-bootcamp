import { NextResponse } from "next/server";
import { db } from "../../../../lib/db.js";
import jwt from "jsonwebtoken";

export async function GET(req, { params }) {
  try {
    const users = await db.user.findFirst({
      where: {
        id: params.userId,
      },
    });

    if (!users) {
      return new NextResponse("User not found", { status: 404 });
    }
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 }); // Fallback to 500
  }
}

export async function PATCH(req, { params }) {
  try {
    const token = req.headers.get("Authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const user = await db.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (user.role !== "ADMIN") {
      return new NextResponse("You are not Administrator", { status: 403 });
    }

    const { name, email, password, access_token, role } = await req.json();

    const userToUpdate = await db.user.findFirst({
      where: {
        id: params.userId,
      },
    });

    if (!userToUpdate) {
      return new NextResponse("User not found", { status: 404 });
    }

    const updateUser = await db.user.update({
      where: {
        id: params.userId,
      },
      data: {
        name,
        email,
        password,
        access_token,
        role,
      },
    });

    return NextResponse.json(updateUser, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 }); // Fallback to 500
  }
}

export async function DELETE(req, { params }) {
  try {
    const token = req.headers.get("Authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    const user = await db.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    if (user.role !== "ADMIN") {
      return new NextResponse("You are not Administrator", { status: 403 });
    }

    const userToDelete = await db.user.findFirst({
      where: {
        id: params.userId, // Correct this to userId
      },
    });

    if (!userToDelete) {
      return new NextResponse("User not found", { status: 404 });
    }

    await db.user.delete({
      where: {
        id: params.userId,
      },
    });

    return new NextResponse("User has been deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 }); // Fallback to 500
  }
}
