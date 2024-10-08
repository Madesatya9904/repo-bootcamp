"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/app/action";
import Swal from "sweetalert2";
import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

export default function Table({ categories }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  const router = useRouter();
  const token = Cookies.get("currentUser");

  const openModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCategoryId(null);
  };

  async function handleDelete(id) {
    try {
      setIsLoading(true);
      await axios.delete(`/api/category/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      setNotification(`Category ${id} has been deleted successfully`);
      setNotificationType("success");

      setTimeout(() => setNotification(null), 3000);

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

  const confirmDelete = () => {
    if (selectedCategoryId) {
      handleDelete(selectedCategoryId.id);
      closeModal();
    }
  };

  const [filterSearchTerm, setFilterSearchTerm] = useState("")

  const filterCategory = categories.filter((category) => (
    category.name.toLowerCase().includes(filterSearchTerm.toLowerCase())
  ))

  const countCategories = filterCategory.length;

  return (
    <div className="">
      {/* Notifikasi */}
      {notification && (
        <div className="flex justify-center">
          <div
            className={`relative flex w-full items-center gap-3 rounded-md p-4 text-white shadow-lg transition-all duration-100 ease-in-out ${
              notificationType === "success"
                ? "border border-green-700 bg-green-500"
                : "border border-rose-800 bg-rose-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-none text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M12 12h.01m-1 8h.01m2-8h.01m2-8h.01M5 12h.01M5 16h.01M5 20h.01M19 12h.01M19 16h.01M19 20h.01"
              />
            </svg>
            <span>{notification}</span>
          </div>
        </div>
      )}

      <div className="mb-4 flex justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Data Categories ( {countCategories} )
        </h4>
        <div className="flex flex-col items-end">
          <Link href="/category/create">
            <button className="rounded-md bg-[#3B82F6] px-2 py-1 text-white">
              Add Category
            </button>
          </Link>
          <input
            className="border-gray-400 mb-2 mt-2 w-[12.9rem] border-b-2 bg-transparent transition-all duration-300 focus:border-blue-600 focus:outline-none"
            type="text"
            placeholder="Search by category name"
            value={filterSearchTerm}
            onChange={(e) => setFilterSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-black dark:text-white">
            <th className="pl-3">ID Category</th>
            <th className="pl-3">Category Name</th>
            <th className="pl-3">Create At</th>
            <th className="pl-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterCategory.length > 0 ? (
            filterCategory.map((category, key) => (
              <tr key={key} className=" border-b border-black dark:border-white">
                <td className="pl-3">
                  <div className="mb-2 mt-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {category.id}
                  </div>
                </td>
                <td className="pl-3">
                  <div className="mb-2 mt-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {category.name}
                  </div>
                </td>
                <td className="pl-3">
                  <div className="mb-2 mt-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {category.created_at.toDateString()}
                  </div>
                </td>
                <td className="pl-3">
                  <div className="text-blue-500 ">
                    <div className="flex flex-row justify-center gap-3">
                      <Link href={`/category/${category.id}`}>
                        <FaEdit className="w-4 cursor-pointer" />
                      </Link>
                      <MdDeleteOutline
                        onClick={() => openModal(category)}
                        className="w-4 cursor-pointer"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <div className="flex h-fit flex-col items-center justify-center">
              <h3>404</h3>
              <p className="text-center">User Not Found</p>
            </div>
          )}
        </tbody>
      </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Delete User</h2>
          <p>
            Are you sure you want to delete the Category{" "}
            <b>{selectedCategoryId.name}</b>?
          </p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={closeModal}
              className="bg-gray-500 mr-2 rounded-md px-4 py-2 text-black"
            >
              Close
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-500 rounded-md px-4 py-2 text-black"
            >
              {isLoading ? "Deleting..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
      )}

      {categories.length === 0 && (
        <div className="flex h-[500px] items-center justify-center text-center">
          No Data
        </div>
      )}
    </div>
  );
}
