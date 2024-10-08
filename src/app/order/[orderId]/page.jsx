import { db } from "../../../lib/db"
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import Detail from '../_components/detail'
export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "Product",
  description: "This is Next.js Product's Admin Panel",
};

const Page = async ({ params }) => {
  // Fetch the order by ID and include related user
  const order = await db.order.findFirst({
    where: { id: params.orderId },
    include: {
      order_items: {
        include: {
          tumbler: true // Include tumbler if it's a related model
        }
      },
      user: true // Make sure to include the user
    }
  });

  if (!order) {
    return <p>Order not found.</p>
  }

  return (
    <DefaultLayout>
      <Detail order={order} />
    </DefaultLayout>
  )
}

export default Page;
