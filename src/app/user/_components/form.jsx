"use client";

import Cookies from "js-cookie";
import axios from "axios";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { IoCreateOutline } from "react-icons/io5";
import { CiWarning } from "react-icons/ci";
import { MdUpdate } from "react-icons/md";

const form = ({ user }) => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(FaEyeSlash);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationForm, setValidationForm] = useState({
    validName: "",
    validEmail: "",
    validPassword: "",
  });
  const [form, setForm] = useState(
    user
      ? user
      : {
          name: "",
          email: "",
          password: "",
          role: "ADMIN",
        },
  );
  const token = Cookies.get("currentUser");
  const router = useRouter();

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (e.target.value) {
      setValidationForm(""); // menghapus error saat memulai ketik
    }
  }

  const handleToggle = () => {
    if (type === "password") {
      setIcon(FaEye);
      setType("text");
    } else {
      setIcon(FaEyeSlash);
      setType("password");
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    if (!form.name.trim()) {
      setValidationForm((prev) => ({
        ...prev,
        validName: "Name cannot be empty",
      }));
      setIsLoading(false);
      return;
    }
    if (!form.email.trim()) {
      setValidationForm((prev) => ({
        ...prev,
        validEmail: "Email cannot be empty",
      }));
      setIsLoading(false);
      return;
    }
    if (form.password.length <= 8) {
      setValidationForm((prev) => ({
        ...prev,
        validPassword: "Password must be at least 8 characters",
      }));
      setIsLoading(false);
      return;
    }

    try {
      if (user) {
        const respone = await axios.patch(
          `/api/user/${user.id}`,
          {
            ...form,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );

        setNotification(`User has been update`);
        setNotificationType("update");

        setTimeout(() => setNotification(null), 3000);
      } else {
        const respone = await axios.post(
          `/api/user`,
          {
            ...form,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );
        setNotification(`User has been created`);
        setNotificationType("create");

        setTimeout(() => setNotification(null), 3000);
      }

      router.push("/user");
      router.refresh();
    } catch (error) {
      console.log(error);

      setNotification(`Error: ${error.message || "Something went wrong!"}`);
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
              }
              `}
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
            <h1 className="text-[1.25rem] font-bold text-white dark:text-black">
              Form User
            </h1>
          </div>
          <div className="h-0.5 w-full bg-white p-0 dark:bg-black"></div>
          <div>
            <label className="text-white dark:text-black">Username</label>
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Input your username"
              onChange={handleChange}
              className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                isLoading ? "cursor-not-allowed bg-transparent" : "bg-white"
              }`}
            />
            {validationForm.validName && (
              <p className="text-sm text-rose-600">
                {validationForm.validName}
              </p>
            )}
          </div>
          <div>
            <label className="text-white dark:text-black">Email</label>
            <input
              type="email"
              placeholder="Input your email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                isLoading ? "cursor-not-allowed bg-transparent" : "bg-white"
              }`}
            />
            {validationForm.validEmail && (
              <p className="text-sm text-rose-600">
                {validationForm.validEmail}
              </p>
            )}
          </div>
          <div>
            <label className="text-white dark:text-black">Password</label>
            <div className="relative flex items-center justify-end">
              <input
                type={type}
                name="password"
                value={form.password}
                autoComplete="current-password"
                onChange={handleChange}
                placeholder="Input your password"
                className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                  isLoading ? "cursor-not-allowed bg-transparent" : "bg-white"
                }`}
              />
              <span className="absolute mr-3" onClick={handleToggle}>
                {icon}
              </span>
            </div>
            {validationForm.validPassword && (
              <p className="text-sm text-rose-600">
                {validationForm.validPassword}
              </p>
            )}
          </div>
          <div>
            <label className="text-white dark:text-black">Role </label>
            <select
              className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                isLoading ? "cursor-not-allowed bg-transparent" : "bg-white"
              }`}
              name="role"
              value={form.value}
              onChange={handleChange}
            >
              <option value="ADMIN">Admin</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>
          <div className="mx-8 flex justify-between">
            <Link href={"/user"}>
              <button className="transform rounded-lg bg-red px-3 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-[#df1818]">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="transform rounded-lg bg-green-500 px-3 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-green-600"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default form;
