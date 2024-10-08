import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import Table from "@/app/product/_components/table";

export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "Product",
  description: "This is Next.js Product's Admin Panel",
};

export default async function ProductPage() {
  const tumbler = await db.tumbler.findMany({
    include: {
      category: true,
    },
  });

  return (
    <DefaultLayout>
      <Table tumbler={tumbler} />
    </DefaultLayout>
  );
}
