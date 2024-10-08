import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Form from "@/app/category/_components/form";

export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "Category",
  description: "This is Next.js Category Admin Panel",
};

export default function CreateCategoryPage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Category" />
      <Form />
    </DefaultLayout>
  );
}
