"use server"
import { revalidatePath } from "next/cache"
import { db } from "../lib/db"

export async function deleteCategory(id){
  await db.category.delete({
    where: {
      id: id
    }
  })
  revalidatePath("/category")
}

export async function deleteProduct(id){
  await db.tumbler.delete({
    where: {
      id: id
    }
  })
  revalidatePath("/product")
}