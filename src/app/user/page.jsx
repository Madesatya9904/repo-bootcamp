import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import Table from "./_components/table";
import { db } from "../../lib/db" 
export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "User",
  description: "This is Next.js User's Admin Panel",
};

const form = async () => {
  const users = await db.user.findMany()
  return (

    <DefaultLayout>
      <Table user={users}  />
    </DefaultLayout>
  );
};

export default form;
