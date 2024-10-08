"use client";

import Link from "next/link";
import React, { useState } from "react";

const Table = ({ order }) => {
  const [filterSearchTerm, setFilterSearchTerm] = useState("");

  const filteredOrders = order.filter((order) =>
    order.user.name.toLowerCase().includes(filterSearchTerm.toLowerCase())
  );
  const orderCount = filteredOrders.length;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="mb-4 text-xl font-semibold text-black dark:text-white">
          Data Order ({orderCount})
        </h1>
        <input
          type="text"
          className="w-[10rem] mb-2 bg-transparent border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none transition-all duration-300"
          placeholder="Search by username"
          value={filterSearchTerm}
          onChange={(e) => setFilterSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabel untuk ukuran layar besar */}
      <div className="hidden lg:grid lg:grid-cols-8 font-bold text-black dark:text-white">
        <h3 className="pl-3">ID User</h3>
        <h3 className="pl-3">Username</h3>
        <h3 className="pl-3">Country</h3>
        <h3 className="pl-3">Address</h3>
        <h3 className="pl-3">PostalCode</h3>
        <h3 className="pl-3">Payment</h3>
        <h3 className="pl-3">Created At</h3>
        <h3 className="text-center">Details</h3>
      </div>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order, index) => (
          <div key={index}>
            <div className="hidden lg:grid lg:grid-cols-8 border-b border-black dark:border-white">
              <p className="mb-2 mt-2 max-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap pl-3">
                {order.user_id}
              </p>
              <p className="mb-2 mt-2 max-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap pl-3">
                {order.user.name}
              </p>
              <p className="mb-2 mt-2 max-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap pl-3">
                {order.country}
              </p>
              <p className="mb-2 mt-2 max-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap pl-3">
                {order.address}
              </p>
              <p className="mb-2 mt-2 max-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap pl-3">
                {order.postal_code}
              </p>
              <p className="mb-2 mt-2 max-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap pl-3">
                {order.payment_method}
              </p>
              <p className="mb-2 mt-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap pl-3">
                {new Date(order.created_at).toDateString()}
              </p>
              <Link
                className="mb-2 mt-2 text-center text-blue-500"
                href={`/order/${order.id}`}
              >
                Read More
              </Link>
            </div>

            {/* Tabel untuk ukuran layar kecil */}
            <div className="lg:hidden border-b border-black dark:border-white p-2">
              <div className="text-black dark:text-white mb-2">
                <span className="font-bold">ID User:</span> {order.user_id}
              </div>
              <div className="text-black dark:text-white mb-2">
                <span className="font-bold">Username:</span> {order.user.name}
              </div>
              <div className="text-black dark:text-white mb-2">
                <span className="font-bold">Country:</span> {order.country}
              </div>
              <div className="text-black dark:text-white mb-2">
                <span className="font-bold">Address:</span> {order.address}
              </div>
              <div className="text-black dark:text-white mb-2">
                <span className="font-bold">PostalCode:</span> {order.postal_code}
              </div>
              <div className="text-black dark:text-white mb-2">
                <span className="font-bold">Payment:</span> {order.payment_method}
              </div>
              <div className="text-black dark:text-white mb-2">
                <span className="font-bold">Created At:</span>{" "}
                {new Date(order.created_at).toDateString()}
              </div>
              <Link
                className="text-blue-500"
                href={`/order/${order.id}`}
              >
                Read More
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center items-center h-fit">
          <h3>404</h3>
          <p className="text-center">Order Not Found</p>
        </div>
      )}
    </div>
  );
};

export default Table;
