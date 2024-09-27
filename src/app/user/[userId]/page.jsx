import React from 'react';
import Table from "@/app/category/_components/table";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import Form from "../_components/form";

const Page = async({ params }) => {
  const users = await db.user.findFirst({
    where: {
      id: params.userId
    }
  });

  if (!users) {
    return (
      <DefaultLayout>
        <Breadcrumb pageName="User" />
        <div>User not found</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Product" />
      <Form user={
        {
          ...users,
          password: ""
        }
      }/>
    </DefaultLayout>
  );
};

export default Page;
