import React from 'react'
import Table from "@/app/category/_components/table";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import Form from "@/app/category/_components/form"

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
