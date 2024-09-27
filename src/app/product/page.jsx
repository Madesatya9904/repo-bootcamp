import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import Table from "@/app/product/_components/table";

export const metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
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
