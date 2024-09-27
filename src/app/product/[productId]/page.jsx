import React from 'react';
import Table from "@/app/category/_components/table";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import Form from "../_components/form";

const Page = async({ params }) => {
  const product = await db.tumbler.findFirst({
    where: {
      id: params.productId
    }
  });

  const categories = await db.category.findMany();

  if (!product) {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Product" />
        <div>Product not found</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product" />
      <Form product={product} categories={categories} />
    </DefaultLayout>
  );
};

export default Page;
