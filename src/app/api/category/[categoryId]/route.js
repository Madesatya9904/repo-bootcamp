import { NextResponse } from "next/server"
import { db } from "../../../../lib/db.js"
import jwt, {JsonWebTokenError} from "jsonwebtoken"

export async function GET(req, { params }) {
  try {
    const category = await db.category.findFirst({
      where: {
        id: params.categoryId
      }
    })

    // jika id tidak ditemukan oleh client
    if (!category) {
      return new NextResponse("Category not found", { status: 404 })
    }
    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return new NextResponse("Internal server error", { status: error.status })
  }
}
export async function PATCH(req, { params }) {
  try {
    const token = req.headers.get("Authorization")
    
    if (!token) {
      return new NextResponse("unauthorization", { status: 401})
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)

    const user = await db.user.findFirst({
      where: {
        id : decoded.id
      }
    })
    if(user.role !== "ADMIN"){
      return new NextResponse("You are not Administrator", {status:403})
    }

    const category = await db.category.findFirst({
      where: {
        id: params.categoryId
      }
    })
    //cek id category
    if (!category) {
      return new NextResponse("Category not found", { status: 404 })
    }

    const { name } = await req.json()

    const updatecategory = await db.category.update({
      where: {
        id: params.categoryId
      },
      data: {
        name: name
      }
    })

    return NextResponse.json(updatecategory, { status: 200 })
  } catch (error) {
    return new NextResponse("Internal server error", { status: error.status })
  }
}
export async function DELETE(req, { params }) {
  try {
    const token = req.headers.get("Authorization")
    
    if (!token) {
      return new NextResponse("unauthorization", { status: 401})
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY)

    const user = await db.user.findFirst({
      where: {
        id : decoded.id
      }
    })
    if(user.role !== "ADMIN"){
      return new NextResponse("You are not Administrator", {status:403})
    }
    
    const category = await db.category.findFirst({
      where: {
        id: params.categoryId
      }
    })

    if(!category) {
      return new NextResponse("Category not found", { status: 404})
    }

    const deleteCategory = await db.category.delete({
      where : {
        id: params.categoryId
      }
    })

    return NextResponse.json({ message: "Category deleted" }, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal server error", { status: error.status})
  }
}