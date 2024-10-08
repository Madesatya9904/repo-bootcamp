import Form from "../_components/form";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "User",
  description: "This is Next.js User's Admin Panel",
};

export default async function CreateProductPage() {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create User" />
      <Form/>
    </DefaultLayout>
  );
}
