import Form from "@/app/user/_components/form";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";

export default async function CreateProductPage() {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create User" />
      <Form/>
    </DefaultLayout>
  );
}
