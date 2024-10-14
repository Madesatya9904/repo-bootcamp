import { NextResponse } from "next/server"
import jwt, { JsonWebTokenError } from "jsonwebtoken"
import { db } from "../../../../lib/db"

// Get order by id and include order_items in order and include product in order_items
export async function GET(req, { params }) {
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

    const order = await db.order.findFirst({
      where: {
        id: params.orderId,
      },
      include: {
        order_items: {
          include: {
            tumbler: {
              include: {
                category: true,
              }
            }
          }
        },
        user: true
      },
    })

    // jika id tidak ditemukan oleh client
    if (!order) {
      return new NextResponse("Orders not found", { status: 404 })
    }
    return NextResponse.json(order, { status: 200 })
  } catch (error) {
    return new NextResponse("Internal server error", { status: error.status })
  }
}

// Delete order by id
export async function DELETE(req, { params }) {
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
    await db.order.delete({
      where: {
        id: params.orderId
      }
    })
    return new NextResponse("has been deleted", { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal server error", { status: error.status })
  }
}
