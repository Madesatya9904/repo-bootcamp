import React from 'react'
import { db } from '@/lib/db'
import TablePage from "./_components/table"

export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "Dashboard",
  description: "This is Next.js Dashboard Admin Panel",
};

const page = async () => {
  const category = await db.category.findMany()
  const product = await db.tumbler.findMany()
  const order = await db.order.findMany()
  const user = await db.user.findMany()
  return (
    <>
      <TablePage categories={category} products={product} orders={order} users={user}/>
    </>
  )
}

export default page
