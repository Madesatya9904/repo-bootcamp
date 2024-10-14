import { NextResponse } from "next/server";
import { db } from "../../../../lib/db.js";
import jwt, { JsonWebTokenError } from "jsonwebtoken"


// Get product by id
export async function GET(req, { params }) {
  try {
    const productIds = await db.tumbler.findFirst({
      where: {
        id: params.productId
      }
    })
    if (!productIds) {
      return new NextResponse("Product not found", { status: 404 })
    }

    return NextResponse.json(productIds, { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal server error", { status: error.status })
  }
}

//  Update product by id
export async function PATCH(req, { params }) {
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
    const { name, categoryId, brand, stock, images, color, price, desc, type, shipping, featured } = await req.json();
    //untuk mencari id category
    const category = await db.category.findFirst({
      where: { 
        id: categoryId 
      }
    });

    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    //untuk mencaro id product tumbler
    const productIds = await db.tumbler.findFirst({
      where: {
        id: params.productId
      }
    })
    if (!productIds) {
      return new NextResponse("Product not found", { status: 404 })
    }

    const updateProduct = await db.tumbler.update({
      where: {
        id: params.productId,
      },
      data: {
        name: name,
        category_id: category.id, // Use the category ID retrieved
        brand: brand,
        stock: stock,
        color: color,
        price: price,
        desc: desc,
        type: type,
        shipping,
        featured,
        images
      }
    })

    return NextResponse.json(updateProduct, { status: 200 });
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", { status: error.status });
  }
}

// Delete product by id
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
    const productId = await db.tumbler.findFirst({
      where: {
        id: params.productId
      },
      include: {
        order_items: true
      }
      
    })
    if (!productId) {
      return new NextResponse("Category not found", { status: 404 })
    }

    await db.tumbler.delete({
      where: {
        id: params.productId
      }
    })

    // if (productId.order_items.length > 0) {
    //   await db.order.delete({
    //     where: {
    //       id: productId.order_items[0].order_id
    //     }
    //   })
    // }
    
    return new NextResponse("Delete Product", { status: 200 })
  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Server Error", { status: error.status })
  }
}
