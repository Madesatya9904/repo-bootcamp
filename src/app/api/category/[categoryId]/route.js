import { NextResponse } from "next/server";
import { db } from "../../../../lib/db.js";
import jwt from "jsonwebtoken";

export async function DELETE(req, { params }) {
  try {
    const token = req.headers.get("Authorization");

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verifikasi token JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    
    // Cari user berdasarkan id dari token
    const user = await db.user.findFirst({
      where: {
        id: decoded.id,
      },
    });

    // Pastikan user adalah ADMIN
    if (!user || user.role !== "ADMIN") {
      return new NextResponse("You are not an Administrator", { status: 403 });
    }

    // Cari kategori berdasarkan id yang diberikan
    const category = await db.category.findFirst({
      where: {
        id: params.categoryId,
      },
    });

    // Jika kategori tidak ditemukan
    if (!category) {
      return new NextResponse("Category not found", { status: 404 });
    }

    // Update produk terkait dengan category_id menjadi null
    await db.tumbler.updateMany({
      where: {
        category_id: params.categoryId,
      },
      data: {
        category_id: null,
      },
    });

    // Hapus kategori setelah produk terkait diupdate
    await db.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json({ message: "Category has been deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error occurred in DELETE:", error);

    // Penanganan error jwt
    if (error instanceof jwt.JsonWebTokenError) {
      return new NextResponse("Invalid token", { status: 401 });
    }

    return new NextResponse("Internal server error", { status: 500 });
  }
}
