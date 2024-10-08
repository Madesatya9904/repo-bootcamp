import Image from "next/image";
import Link from "next/link";
import Form from "@/app/auth/_components/form";
import Logo1 from "../../../../public/logoicon/logo1.png"

export const metadata = {
  icons: {
    icon: "/logoicon/logo1.png"
  },
  title: "Login Page",
  description: "This is Next.js Signin Admin Panel",
};

export default async function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-sm border border-black-2 bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <div className="flex items-center justify-center">
              <Link className="mb-5.5 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={Logo1}
                  alt="Logo"
                  width={120}
                  height={29}
                />
                <Image
                  className="dark:hidden"
                  src={Logo1}
                  alt="Logo"
                  width={120}
                  height={29}
                />
                
              </Link>
              <span className="text-2xl text-black-2 dark:text-white font-semibold">Admin Panel</span>
              </div>

              <p className="2xl:px-20">
              Welcome to the Admin Panel of Just Happy Friends – where great connections thrive and happiness grows!
              </p>
            </div>
          </div>

          <div className="w-full bg-gray dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Sign-in</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Admin Panel
              </h2>

              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
