"use client";

import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";

const Detail = ({ order }) => {
  const token = Cookies.get("currentUser");

  const [copyTextUserId, setCopyTextUserId] = useState(false);
  const [copyTextOrderId, setCopyTextOrderId] = useState(false);
  const [messageCopy, setMessageCopy] = useState("");

  function copyTextUser() {
    try {
      navigator.clipboard.writeText(order.user_id);
      setCopyTextUserId(order.user_id);
      setTimeout(() => {
        setCopyTextUserId(false);
      }, 800);
    } catch (error) {
      setMessageCopy("Failed to copy");
      setTimeout(() => {
        setMessageCopy("");
      }, 800);
    }
  }

  function copyTextOrder() {
    try {
      navigator.clipboard.writeText(order.id);
      setCopyTextOrderId(order.id);
      setTimeout(() => {
        setCopyTextOrderId(false);
      }, 800);
    } catch (error) {
      setMessageCopy("Failed to copy");
      setTimeout(() => {
        setMessageCopy("");
      }, 800);
    }
  }

  let IDR = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <div className="space-y-2 rounded-lg bg-[#1C2434] p-5 shadow-xl dark:bg-white">
      <div className="flex items-center justify-between px-6">
        <div>
          <h3 className="text-[1rem] lg:text-[1.25rem] font-bold text-white dark:text-black">
            Items Order
          </h3>
          <h4 className="text-blue-500 text-sm md:text-base lg:text-lg">
            {order.created_at.toDateString()}
          </h4>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-[0.85rem] lg:text-[1.10rem] font-bold text-white dark:text-black">
            Order Id
          </p>
          <div className="h-0.5 w-22 border-t border-dashed border-white p-0 dark:border-black"></div>
          <h3 className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm lg:text-[1rem] font-bold text-blue-500">
            {order.id}
          </h3>
        </div>
      </div>
      <div className="h-0.5 w-full bg-white p-0 dark:bg-black"></div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 px-4">
        <div className="flex space-x-5">
          <div className="text-white dark:text-black">
            <h5 className="text-xs md:text-[1rem]">Customer Id</h5>
            <h5 className="text-xs md:text-[1rem]">Order Id</h5>
          </div>
          <div className="">
            <div className="flex">
              <button className="text-blue-500" onClick={copyTextUser}>
                {copyTextUserId ? (
                  <p className="text-white dark:text-black">Copied</p>
                ) : (
                  <p className="text-blue-500 text-xs md:text-[1rem]">Copy Customer Id</p>
                )}
              </button>
              {messageCopy && (
                <p className="ml-6 text-sm text-white dark:text-black">
                  {messageCopy}
                </p>
              )}
            </div>
            <div className="flex">
              <button className="text-blue-500" onClick={copyTextOrder}>
                {copyTextOrderId ? (
                  <p className="text-white dark:text-black">Copied</p>
                ) : (
                  <p className="text-blue-500 text-xs md:text-[1rem]">Copy Order Id</p>
                )}
              </button>
              {messageCopy && (
                <p className="ml-6 text-sm text-white dark:text-black">
                  {messageCopy}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex space-x-5">
          <div className="grid grid-rows-3">
            <h5 className="text-xs md:text-[1rem] text-white dark:text-black">Address</h5>
            <h5 className="text-xs md:text-[1rem] text-white dark:text-black">Postal Code</h5>
            <h5 className="text-xs md:text-[1rem] text-white dark:text-black">Country</h5>
          </div>
          <div className="grid grid-rows-3">
            <p className="text-white dark:text-black text-xs md:text-[1rem]">{order.address}</p>
            <p className="text-white dark:text-black text-xs md:text-[1rem]">{order.postal_code}</p>
            <p className="text-white dark:text-black text-xs md:text-[1rem]">{order.country}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-white dark:bg-[#1C2434]">
            <tr>
              <th className="px-4 py-2 text-left text-black dark:text-white">Id Tumbler</th>
              <th className="px-4 py-2 text-left text-black dark:text-white">Name Product</th>
              <th className="px-4 py-2 text-left text-black dark:text-white">Brand</th>
              <th className="px-4 py-2 text-left text-black dark:text-white">Color</th>
              <th className="px-4 py-2 text-left text-black dark:text-white">Quantity</th>
              <th className="px-4 py-2 text-left text-black dark:text-white">Type Product</th>
              <th className="px-4 py-2 text-left text-black dark:text-white">Price</th>
            </tr>
          </thead>

          <tbody>
            {order.order_items.map((product, index) => (
              <tr key={index} className="bg-[#F6F4EB] dark:bg-[#2A2D34]">
                <td className="px-4 py-2 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{product.id}</td>
                <td className="px-4 py-2 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{product.tumbler.name}</td>
                <td className="px-4 py-2 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{product.tumbler.brand}</td>
                <td className="px-4 py-2 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                  <div
                    style={{
                      backgroundColor: product.color,
                      height: 15,
                      width: 15,
                    }}
                    className="inline-block"
                  />
                </td>
                <td className="px-4 py-2 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{product.quantity}</td>
                <td className="px-4 py-2 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{product.tumbler.type}</td>
                <td className="px-4 py-2 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{IDR.format(product.tumbler.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Detail;
