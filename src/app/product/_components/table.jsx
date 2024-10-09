"use client";

import axios, { Axios } from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { db } from "../../../lib/db";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function Table({ tumbler }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null); // Track user to delete
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const router = useRouter();
  const token = Cookies.get("currentUser");

  const openModal = (product) => {
    setProductToDelete(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setProductToDelete(null);
  };

  // Buatlah fungsi untuk mendelete product berdasarkan id
  async function handleDelete(id) {
    try {
      const respone = await axios.delete(`/api/products/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      setNotification(`Product ${id} has beeb deleted successfully`);
      setNotificationType("success");

      setTimeout(() => setNotification(null), 3000);

      router.push("/product");
      router.refresh();
    } catch (err) {
      console.log(err);

      setNotification(`Error: ${err.message || "Something went wrong!"}`);
      setNotificationType("error");

      setTimeout(() => setNotificationType(null), 3000);
    } finally {
      setIsLoading(false);
    }
  }

  const confirmDelete = () => {
    if (productToDelete) {
      handleDelete(productToDelete.id);
      closeModal();
    }
  };

  const [filterSearchTerm, setFilterSearchTerm] = useState("");
  console.log(filterSearchTerm);

  const filterProduct = tumbler.filter((product) =>
    product.name.toLowerCase().includes(filterSearchTerm.toLowerCase()),
  );

  const productCount = filterProduct.length;
  return (
    <div className="">
      {notification && (
        <div className="flex justify-center">
          <div
            className={`relative flex w-full items-center gap-3 rounded-md p-4 text-white shadow-lg transition-all duration-100 ease-in-out ${
              notificationType === "success"
                ? "border border-green-700 bg-green-500"
                : "border border-rose-800 bg-rose-600"
            }`}
          >
            {notificationType === "success" ? (
              <RiDeleteBin6Line className="text-3xl" />
            ) : (
              <CiWarning className="text-3xl" />
            )}
            <span>{notification}</span>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <h1 className="mb-4 text-xl font-semibold text-black dark:text-white">
          Data Product ( {productCount} )
        </h1>
        <div className="flex flex-col items-end">
          <Link href="/product/create">
            <button className="rounded-md bg-[#3B82F6] px-2 py-1 text-white">
              Add Product
            </button>
          </Link>
          <input
            className="border-gray-400 mb-2 mt-2 w-[12.3rem] border-b-2 bg-transparent transition-all duration-300 focus:border-blue-600 focus:outline-none"
            type="text"
            placeholder="Search by product name"
            value={filterSearchTerm}
            onChange={(e) => setFilterSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-black dark:text-white">
            <th className="pl-3">Image </th>
            <th className="pl-3">Name</th>
            <th className="pl-3">Category</th>
            <th className="pl-3">Price</th>
            <th className="pl-3">Stock</th>
            <th className="pl-3">Colors</th>
            <th className="pl-3">Brand</th>
            <th className="pl-3">Featured</th>
            <th className="pl-3">Shipping</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterProduct.length > 0 ? (
            filterProduct.map((product, index) => (
              <tr
                key={index}
                className="border-b border-black dark:border-white"
              >
                <td className="pl-3">
                  <div className="mb-2 mt-2 h-12.5 w-15 overflow-hidden rounded-md">
                    <Image
                      src={`/api/images/${product.images[0]}`}
                      className="h-auto w-auto"
                      width={50}
                      height={40}
                      alt="Product"
                    />
                  </div>
                </td>
                <td className="pl-3">
                  <p className="mb-2 mt-2 max-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.name}
                  </p>
                </td>
                <td className="pl-3">
                  <p className="mb-2 mt-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {product.category ? product.category.name : 'No category'}

                  </p>
                </td>
                <td className="pl-3">
                  <p className="mb-2 mt-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    Rp {product.price.toLocaleString()}
                  </p>
                </td>
                <td className="pl-3">
                  <p className="mb-2 mt-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.stock}
                  </p>
                </td>
                <td className="pl-3">
                  <div className="flex">
                    {product.color.slice(0, 1).map((color, i) => (
                      <div
                        style={{
                          backgroundColor: color,
                          height: 30,
                          width: 30,
                          borderRadius: 50,
                        }}
                        key={i}
                      />
                    ))}
                  </div>
                </td>
                <td className="pl-3">
                  <p className="mb-2 mt-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.brand}
                  </p>
                </td>
                <td className="pl-3">
                  <p className="mb-2 mt-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.featured ? "Yes" : "No"}
                  </p>
                </td>
                <td className="pl-3">
                  <p className="mb-2 mt-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {product.shipping ? "Yes" : "No"}
                  </p>
                </td>
                <td>
                  <div className="text-blue-500 ">
                    <div className="flex flex-row items-center justify-center gap-3">
                      <Link href={`/product/${product.id}`}>
                        <FaEdit className="w-4 cursor-pointer" />
                      </Link>
                      <MdDeleteOutline
                        onClick={() => openModal(product)}
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
              <p className="text-center">Product Not Found</p>
            </div>
          )}
        </tbody>
      </table>
      </div>

      {/* Modal for deleting user */}
      {showModal && productToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Delete User</h2>
            <p>
              Are you sure you want to delete the Product{" "}
              <b>{productToDelete.name}</b>?
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

      {tumbler.length === 0 && (
        <div className="flex h-[500px] items-center justify-center text-center">
          No Data
        </div>
      )}
    </div>
  );
}
