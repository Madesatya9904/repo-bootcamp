import Table from "@/app/category/_components/table";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";

export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "Category",
  description: "This is Next.js Category Admin Panel",
};

export default async function CategoryPage() {
  const categories = await db.category.findMany({
    orderBy: {
      created_at: "asc",
    },
  });

  return (
    <DefaultLayout>
      <Table categories={categories} />
    </DefaultLayout>
  );
}
