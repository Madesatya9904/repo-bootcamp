import React from 'react';
import Table from "@/app/category/_components/table";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import Form from "../_components/form";
export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "User",
  description: "This is Next.js User's Admin Panel",
};

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
      <Breadcrumb pageName="User" />
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
