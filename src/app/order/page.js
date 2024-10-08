import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Table from "./_components/table.jsx"
import React from 'react'
import { db } from "@/lib/db.js"

export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "Order",
  description: "This is Next.js Order's Admin Panel",
};

const page = async () => {

  const orders = await db.order.findMany({
    include: {
      order_items: {
        include: {
          tumbler: true,
        }
      },user: true
    }
  })
  // console.log(orders)
  return (
    <div>
      <DefaultLayout>
        <Table order={orders}/>
      </DefaultLayout>
    </div>
  )
}

export default page
