"use client";

import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { CiWarning } from "react-icons/ci";
import { MdUpdate } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

export default function Form({ category }) {
  const router = useRouter();
  const [name, setName] = useState(category ? category.name : "");
  const [isLoading, setIsLoading] = useState(false);
  const [validationForm, setValidationForm] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const token = Cookies.get("currentUser");

  function handleChange(event) {
    setName(event.target.value);
    if (event.target.value) {
      setValidationForm(""); // menghapus error saat memulai ketik
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    if (!name.trim()) {
      setValidationForm("Name cannot be empty");
      setIsLoading(false);
      return;
    }

    try {
      if (category) {
        await axios.patch(
          `/api/category/${category.id}`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );

        setNotification(`Category has been update`);
        setNotificationType("update");

        setTimeout(() => setNotification(null), 3000);
      } else {
        await axios.post(
          `/api/category`,
          {
            name,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );
        setNotification("Category han been created");
        setNotificationType("create");

        setTimeout(() => setNotification(null), 3000);
      }
      router.push("/category");
      router.refresh();
    } catch (err) {
      console.log(err);

      setNotification(`Error: ${err.message || "Something went wrong!"}`);
      setNotificationType("error");

      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {notification && (
        <div className="flex justify-center">
          <div
            className={`relative flex w-full items-center gap-3 rounded-md p-4 text-white shadow-lg transition-all duration-100 ease-in-out 
          ${
            notificationType === "create"
              ? "border border-green-700 bg-green-500"
              : notificationType === "update"
                ? "border-blue-700 bg-blue-500"
                : "border border-rose-800 bg-rose-600"
          }`}
          >
            {notificationType === "create" ? (
              <IoCreateOutline className="text-3xl" />
            ) : notificationType === "update" ? (
              <MdUpdate className="text-3xl" />
            ) : (
              <CiWarning className="text-3xl" />
            )}
            <span>{notification}</span>
          </div>
        </div>
      )}
      <div className="mt-6 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg space-y-2 rounded-lg bg-[#1C2434] p-5 shadow-xl dark:bg-white"
        >
          <div>
            <h3 className="text-[1.25rem] font-bold text-white dark:text-black">
              Form
            </h3>
          </div>
          <div className="h-0.5 w-full bg-white p-0 dark:bg-black"></div>
          <div>
            <label className="text-white dark:text-black">Name</label>
            <input
              type="text"
              value={name}
              onChange={handleChange}
              placeholder="Name"
              className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                isLoading ? "cursor-not-allowed bg-transparent" : "bg-white"
              }`}
            />
            {validationForm && (
              <p className="mt-1 text-sm text-rose-600 ">{validationForm}</p>
            )}
          </div>
          <div className="mx-8 flex justify-between">
            <Link href={"/category"}>
              <button className="transform rounded-lg bg-red px-3 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-[#df1818]">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="transform rounded-lg bg-green-500 px-3 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
