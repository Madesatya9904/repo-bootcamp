import { NextResponse } from "next/server"
import { db } from "../../../lib/db.js"
import jwt from "jsonwebtoken"

export async function POST(req) {
  try {
    const token = req.headers.get("Authorization")

    if (!token) {
      return new NextResponse("unauthorization", { status: 401 })
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)

    const user = await db.user.findFirst({
      where: {
        id: decoded.id
      }
    })
    if (user.role !== "ADMIN") {
      return new NextResponse("You are not Administrator", { status: 403 })
    }
    const { name, category_id, brand, stock, color, price, desc, type, images } = await req.json();

    // Validate that the category exists
    const category = await db.category.findFirst({
      where: { id: category_id }
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    // Create the new Tumbler product
    const tumbler = await db.tumbler.create({
      data: {
        name,
        category_id, // Use the category ID retrieved
        brand,
        stock,
        color,
        price,
        desc,
        type,
        images
      }
    });

    // Return the created product with a 201 status
    return NextResponse.json(tumbler, { status: 201 });
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req) {
  try {
    const products = await db.tumbler.findMany({
      include: {
        category: true
      }
    })

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", { status: error.status });
  }
}
