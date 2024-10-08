"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaAngleDoubleUp, FaCopy } from "react-icons/fa";
import Link from "next/link";
import { TbCategoryPlus } from "react-icons/tb";
import { LuUsers } from "react-icons/lu";
import { FaOpencart } from "react-icons/fa6";
import { CiShoppingTag } from "react-icons/ci";

const Page = ({ categories, products, orders, users }) => {
  const [loading, setLoading] = useState(true); 
  const [userData, setUserData] = useState(null);
  const [copyTextUserId, setCopyTextUserId] = useState();
  const [copyTextUsername, setCopyTextUsername] = useState();
  const [copyTextUserEmail, setCopyTextUserEmail] = useState();
  const router = useRouter();

  const fetchData = useCallback(async () => {
    const token = Cookies.get("currentUser");

    if (!token) {
      router.push("/auth/signin");
      return;
    }

    try {
      const response = await axios.get("/api/auth/sign-in", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        router.push("/auth/signin");
        return;
      }

      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>Error loading user data.</p>;
  }

  function copyTextUserById() {
    try {
      navigator.clipboard.writeText(userData.id);
      setCopyTextUserId(userData.id);
      setTimeout(() => {
        setCopyTextUserId(false);
      }, 800);
    } catch (error) {
      console.log(error);
    }
  }
  
  function copyTextUsernameByUser() {
    try {
      navigator.clipboard.writeText(userData.name);
      setCopyTextUsername(userData.name);
      setTimeout(() => {
        setCopyTextUsername(false);
      }, 800);
    } catch (error) {
      console.log(error);
    }
  }

  function copyTextEmailByUser() {
    try {
      navigator.clipboard.writeText(userData.email);
      setCopyTextUserEmail(userData.email);
      setTimeout(() => {
        setCopyTextUserEmail(false);
      }, 800);
    } catch (error) {
      console.log(error);
    }
  }

  const categoryLength = categories.length;
  const productLength = products.length;
  const orderLength = orders.length;
  const userLength = users.length;

  return (
    <>
      <h1 className="text-center text-black dark:text-white font-bold text-xl mt-2 mb-4">
        Welcome to the Admin Page!
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="col-span-2 lg:col-span-3 rounded-lg bg-[#1C2434] p-3 dark:bg-[#F6F4EB]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-white dark:text-black-2">
            <div className="col-span-1 grid grid-cols-2 gap-2">
              <div className="grid grid-rows-2 gap-2">
                <p>Username</p>
                <p>E-mail</p>
              </div>
              <div className="grid grid-rows-2 gap-2">
                <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                  : {userData?.name}
                </span>
                <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                  : {userData?.email}
                </span>
              </div>
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-2">
              <button onClick={copyTextUsernameByUser} className="flex items-center">
                <FaCopy className="text-[13px]" />
                <p className="ml-2 text-sm">
                  {copyTextUsername ? "Has been copied" : ""}
                </p>
              </button>
              <button onClick={copyTextEmailByUser} className="flex items-center">
                <FaCopy className="text-[13px]" />
                <p className="ml-2 text-sm">
                  {copyTextUserEmail ? "Has been copied" : ""}
                </p>
              </button>
            </div>
            <div className="col-span-1 grid grid-cols-2 gap-2">
              <div className="grid grid-rows-2 gap-2">
                <p>User Id</p>
                <p>Role</p>
              </div>
              <div className="grid grid-rows-2 gap-2">
                <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                  : {userData?.id}
                </span>
                <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                  : {userData?.role}
                </span>
              </div>
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-2">
              <button onClick={copyTextUserById} className="flex items-center">
                <FaCopy className="text-[13px]" />
                <p className="ml-2 text-sm">
                  {copyTextUserId ? "Has been copied" : ""}
                </p>
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <button className="rounded-lg border-2 border-sky-500 px-2 py-1 text-black-2 transition-all duration-500 ease-in-out active:bg-sky-500 active:text-white dark:text-white">
            <Link href={`/dashboard/${userData?.id}`}>Change Password</Link>
          </button>
        </div>
      </div>
      <div className="mt-12">
        <div className="mx-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-[#1C2434] dark:bg-white px-5 py-6 text-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl text-white dark:text-black">Categories</h1>
              <div className="rounded-lg bg-white dark:bg-[#1C2434] p-[2px]">
                <TbCategoryPlus className="text-xl text-sky-500 dark:text-white" />
              </div>
            </div>
            <div className="mt-1">
              <div className="flex items-center justify-center gap-2">
                <p className="text-xl text-white dark:text-black">{categoryLength}</p>
                <FaAngleDoubleUp className="text-lg text-sky-500" />
              </div>
              <span className="text-sm text-[#F6F4EB] dark:text-black">
                Categories Active - Keep Growing!
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl bg-[#1C2434] dark:bg-white px-5 py-6 text-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl text-white dark:text-black">Product's</h1>
              <div className="rounded-lg bg-white dark:bg-[#1C2434] p-[2px]">
                <CiShoppingTag className="text-lg text-sky-500 dark:text-white" />
              </div>
            </div>
            <div className="mt-1">
              <div className="flex items-center justify-center gap-2">
                <p className="text-xl text-white dark:text-black">{productLength}</p>
                <FaAngleDoubleUp className="text-lg text-sky-500" />
              </div>
              <span className="text-sm text-[#F6F4EB] dark:text-black">
                Total Product's on Sale!
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl bg-[#1C2434] dark:bg-white px-5 py-6 text-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl text-white dark:text-black">User's</h1>
              <div className="rounded-lg bg-white dark:bg-[#1C2434] p-[2px]">
                <LuUsers className="text-lg text-sky-500 dark:text-white" />
              </div>
            </div>
            <div className="mt-1">
              <div className="flex items-center justify-center gap-2">
                <p className="text-xl text-white dark:text-black">{userLength}</p>
                <FaAngleDoubleUp className="text-lg text-sky-500" />
              </div>
              <span className="text-sm text-[#F6F4EB] dark:text-black">
                Active Users at this Time!
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl bg-[#1C2434] dark:bg-white px-5 py-6 text-center">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl text-white dark:text-black">Orders</h1>
              <div className="rounded-lg bg-white dark:bg-[#1C2434] p-[2px]">
                <FaOpencart className="text-lg text-sky-500 dark:text-white" />
              </div>
            </div>
            <div className="mt-1">
              <div className="flex items-center justify-center gap-2">
                <p className="text-xl text-white dark:text-black">{orderLength}</p>
                <FaAngleDoubleUp className="text-lg text-sky-500" />
              </div>
              <span className="text-sm text-[#F6F4EB] dark:text-black">
                Your Shop’s Orders!
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
