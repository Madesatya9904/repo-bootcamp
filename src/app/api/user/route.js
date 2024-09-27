import { NextResponse } from "next/server"
import { db } from "../../../lib/db.js"
import jwt, {JsonWebTokenError} from "jsonwebtoken"
import { hashSync } from "bcrypt";
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime/library"

export async function GET(req){
  try {
    const users = await db.user.findMany()

    return NextResponse.json(users, { status: 201 })
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: error.status })
  }
}
export async function POST(req, res) {
  try {
    const token = req.headers.get("Authorization")

    if (!token) {
      return new NextResponse("unauthorization", { status: 401 })
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)

    const player = await db.user.findFirst({
      where: {
        id: decoded.id
      }
    })
    if (player.role !== "ADMIN") {
      return new NextResponse("You are not Administrator", { status: 403 })
    }
    // Get data from body request
    const { name, email, password, role } = await req.json();

    // Create new user
    const user = await db.user.create({
      data: {
        name,
        password: hashSync(password, 10),
        email,
        role,
      },
    });

    // Delete password from object user for hiding password
    delete user.password;

    // Return user
    return NextResponse.json({
      ...user,
    });
  } catch (err) {
    console.log(err);
    if (err instanceof PrismaClientKnownRequestError) {
      return new NextResponse("User already exists", { status: 400 });
    } else if (err instanceof PrismaClientValidationError) {
      return new NextResponse("User validation error", { status: 400 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  }
}