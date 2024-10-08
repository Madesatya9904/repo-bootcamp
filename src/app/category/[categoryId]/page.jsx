import React from 'react'
import Table from "@/app/category/_components/table";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import Form from "@/app/category/_components/form"

export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "Category",
  description: "This is Next.js Category Admin Panel",
};

 const page = async({params}) => {
  const category = await db.category.findFirst({
    where: {
      id: params.categoryId
    }
  })
  console.log(category);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Category" />
      <Form category={category} />
    </DefaultLayout>
  )
}

export default page
