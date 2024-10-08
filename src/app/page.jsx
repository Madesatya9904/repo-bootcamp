import CardDataStats from "@/components/CardDataStats";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Page from "../app/dashboard/page"

export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "Dashboard",
  description: "This is Next.js Dashboard Admin Panel",
};

export default async function Home() {
  return (
    <>
      <DefaultLayout>
        <Page/>
      </DefaultLayout>
    </>
  );
}
