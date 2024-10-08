import { compareSync } from "bcrypt";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { use } from "react";

export async function POST(req, res) {
  try {
    const { email, password } = await req.json();

    const user = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return new NextResponse("User not found", {status:404})
    }

    if (!compareSync(password, user.password)) {
      return new NextResponse("Password is incorrect", { status: 401 });
    }

    if (user.role !== "ADMIN") {
      return new NextResponse("You are not authorized to access this route", {
        status: 401,
      });
    }

    const token = jwt.sign({ id: user.id}, process.env.JWT_ACCESS_KEY, {
      expiresIn: "10d",
    });

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        access_token: token,
      },
    });

    delete user.password;
    delete user.access_token;

    return NextResponse.json({
      ...user,
      token,
    });
  } catch (err) {
    console.log(err);

    return new NextResponse("Internal Server Error", { status: 500 });
  }

}

export async function GET(req) {
  try {
    // Ambil token dari header Authorization
    const token = req.headers.get('Authorization');

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verifikasi token dengan JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

    // Ambil data user dari database berdasarkan ID dari token
    const user = await db.user.findUnique({
      where: {
        id: decoded.id, // ID berasal dari token
      },
    });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Hapus password dan access_token dari response
    const { password, access_token, ...userData } = user;

    // Kembalikan data user
    return NextResponse.json(userData);
  } catch (err) {
    console.error("Error:", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}