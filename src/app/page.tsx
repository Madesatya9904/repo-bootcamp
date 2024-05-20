import CardDataStats from "@/components/CardDataStats";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Home() {
  const products = await db.product.count();
  const orders = await db.order.count();
  const itemSold = await db.orderItems.aggregate({
    _sum: {
      quantity: true,
    },
  });
  const customers = await db.user.count({
    where: {
      role: "CUSTOMER",
    },
  });

  const dashboardData = [
    {
      id: 1,
      title: "Total Products",
      value: products,
      icon: (
        <svg
          className="fill-primary dark:fill-white"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
            fill=""
          />
          <path
            d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
            fill=""
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Total Orders",
      value: orders,
      icon: (
        <svg
          className="fill-primary dark:fill-white"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7 18C5.89 18 5 18.89 5 20C5 21.11 5.89 22 7 22C8.11 22 9 21.11 9 20C9 18.89 8.11 18 7 18ZM1 2V4H3L6.6 11.59L5.24 14.04C5.09 14.32 5 14.65 5 15C5 16.11 5.89 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.66L8.1 13H14.55C15.3 13 15.96 12.58 16.3 11.97L19.88 5.47C19.96 5.32 20 5.16 20 5C20 4.45 19.55 4 19 4H5.21L4.27 2H1ZM18 18C16.89 18 16 18.89 16 20C16 21.11 16.89 22 18 22C19.11 22 20 21.11 20 20C20 18.89 19.11 18 18 18ZM7 15C6.78 15 6.58 14.91 6.45 14.76L7.03 13.5H17.8L14.83 8.03L7.55 8.02L7.03 9.29C7.01 9.29 7 9.29 7 9.29V15ZM7.57 10.44H13.34L12.1 12.88L7.56 12.87L7.57 10.44Z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Total Items Sold",
      value: itemSold._sum.quantity,
      icon: (
        <svg
          className="fill-primary dark:fill-white"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 1C5.48 1 1 5.48 1 11C1 16.52 5.48 21 11 21C16.52 21 21 16.52 21 11C21 5.48 16.52 1 11 1ZM11 19C6.59 19 3 15.41 3 11C3 6.59 6.59 3 11 3C15.41 3 19 6.59 19 11C19 15.41 15.41 19 11 19Z"
            fill=""
          />
          <path
            d="M12 15V16H10V15C8.34 15 7 13.66 7 12H9C9 12.55 9.45 13 10 13H12C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11H10C8.9 11 8 10.1 8 9C8 7.9 8.9 7 10 7V6H12V7C13.66 7 15 8.34 15 10H13C13 9.45 12.55 9 12 9H10C9.45 9 9 9.45 9 10C9 10.55 9.45 11 10 11H12C13.1 11 14 11.9 14 13C14 14.1 13.1 15 12 15Z"
            fill=""
          />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Total Customers",
      value: customers,
      icon: (
        <svg
          className="fill-primary dark:fill-white"
          width="22"
          height="18"
          viewBox="0 0 22 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.18418 8.03751C9.31543 8.03751 11.0686 6.35313 11.0686 4.25626C11.0686 2.15938 9.31543 0.475006 7.18418 0.475006C5.05293 0.475006 3.2998 2.15938 3.2998 4.25626C3.2998 6.35313 5.05293 8.03751 7.18418 8.03751ZM7.18418 2.05626C8.45605 2.05626 9.52168 3.05313 9.52168 4.29063C9.52168 5.52813 8.49043 6.52501 7.18418 6.52501C5.87793 6.52501 4.84668 5.52813 4.84668 4.29063C4.84668 3.05313 5.9123 2.05626 7.18418 2.05626Z"
            fill=""
          />
          <path
            d="M15.8124 9.6875C17.6687 9.6875 19.1468 8.24375 19.1468 6.42188C19.1468 4.6 17.6343 3.15625 15.8124 3.15625C13.9905 3.15625 12.478 4.6 12.478 6.42188C12.478 8.24375 13.9905 9.6875 15.8124 9.6875ZM15.8124 4.7375C16.8093 4.7375 17.5999 5.49375 17.5999 6.45625C17.5999 7.41875 16.8093 8.175 15.8124 8.175C14.8155 8.175 14.0249 7.41875 14.0249 6.45625C14.0249 5.49375 14.8155 4.7375 15.8124 4.7375Z"
            fill=""
          />
          <path
            d="M15.9843 10.0313H15.6749C14.6437 10.0313 13.6468 10.3406 12.7874 10.8563C11.8593 9.61876 10.3812 8.79376 8.73115 8.79376H5.67178C2.85303 8.82814 0.618652 11.0625 0.618652 13.8469V16.3219C0.618652 16.975 1.13428 17.4906 1.7874 17.4906H20.2468C20.8999 17.4906 21.4499 16.9406 21.4499 16.2875V15.4625C21.4155 12.4719 18.9749 10.0313 15.9843 10.0313ZM2.16553 15.9438V13.8469C2.16553 11.9219 3.74678 10.3406 5.67178 10.3406H8.73115C10.6562 10.3406 12.2374 11.9219 12.2374 13.8469V15.9438H2.16553V15.9438ZM19.8687 15.9438H13.7499V13.8469C13.7499 13.2969 13.6468 12.7469 13.4749 12.2313C14.0937 11.7844 14.8499 11.5781 15.6405 11.5781H15.9499C18.0812 11.5781 19.8343 13.3313 19.8343 15.4625V15.9438H19.8687Z"
            fill=""
          />
        </svg>
      ),
    },
  ];

  console.log(dashboardData);

  return (
    <>
      <DefaultLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {dashboardData.map((data) => (
            <CardDataStats
              key={data.id}
              title={data.title}
              total={data.value}
              levelUp
              levelDown={null}
              rate={null}
            >
              {data.icon}
            </CardDataStats>
          ))}
        </div>
      </DefaultLayout>
    </>
  );
}
