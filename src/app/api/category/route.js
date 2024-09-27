import { NextResponse } from "next/server"
import { db } from "../../../lib/db.js"
import jwt, {JsonWebTokenError} from "jsonwebtoken"
import { use } from "react"

export async function POST(req){
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
    const { name } = await req.json()
    
    const category = await db.category.create({
      data : {
        name : name,
      }
    })
    return NextResponse.json(category, { status: 201 })
  } catch(err) {
    console.log(err)
    return new NextResponse("Internal Server Error", { status: err.status})
    
  }
}
export async function GET(req){
  try {
    const category = await db.category.findMany()

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: error.status })
  }
}