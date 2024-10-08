import React from "react";
import { db } from "../../../lib/db";
import Form from "../_components/form";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "Dashboard",
  description: "This is Next.js Dashboard Admin Panel",
};

const page = async ({ params }) => {
  const users = await db.user.findFirst({
    where: {
      id: params.userId,
    },
  });
  return (
    <DefaultLayout>
      <Breadcrumb pageName="User" />
      <Form
        user={{
          ...users,
          password: "",
        }}
      />
    </DefaultLayout>
  );
};

export default page;
