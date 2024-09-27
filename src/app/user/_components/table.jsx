"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import Link from "next/link";
import { CiWarning } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";


export default function Table({ user }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // Track user to delete
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("");
  const router = useRouter();
  const token = Cookies.get("currentUser");

  const openModal = (user) => {
    setUserToDelete(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setUserToDelete(null);
  };

  // Function to delete user by id
  async function handleDelete(id) {
    try {
      setIsLoading(true);
      const response = await axios.delete(`/api/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      setNotification(`User ${id} has been deleted successfully`)
      setNotificationType("success")

      setTimeout(() => setNotification(null), 3000);
      
      router.push("/user");
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
      if (userToDelete) {
        handleDelete(userToDelete.id);
        closeModal(); // Close the modal after deletion
      }
    };
  const userCount = user.length; /// jumlah data user

  return (
    <div>
      {notification && (
        <div className="flex justify-center">
          <div className={`relative flex w-full items-center gap-3 rounded-md p-4 text-white shadow-lg transition-all duration-100 ease-in-out ${
      notificationType === "success"
        ? "border border-green-700 bg-green-500"
        : "border border-rose-800 bg-rose-600"
    }`}>
            {notificationType === "success" ? (
              <RiDeleteBin6Line className="text-3xl"/>
            ) : (
              <CiWarning className="text-3xl"/>
            )}
            <span>{notification}</span>
          </div>
        </div>
      )}
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold text-black dark:text-white mb-4">Data User ( {userCount} )</h1>
        <Link href="/user/create">
          <button className="bg-[#3B82F6] text-white py-1 px-2 rounded-md">Add User</button>
        </Link>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left text-black dark:text-white">
            <th className="pl-3">ID</th>
            <th className="pl-3">User Name</th>
            <th className="pl-3">Email</th>
            <th className="pl-3">Role</th>
            <th className="pl-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((player, index) => (
            <tr key={index} className="border-b border-black dark:border-white">
              <td className="w-2 pl-3">
                <div className="mb-2 mt-2 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
                  {player.id}
                </div>
              </td>
              <td className="pl-3">{player.name}</td>
              <td className="pl-3">{player.email}</td>
              <td className="pl-3">{player.role}</td>
              <td className="pl-3">
                <div className="text-blue-500 ">
                  <div className="flex flex-row justify-center gap-3">
                    <Link href={`/user/${player.id}`}>
                      <FaEdit className="w-4 cursor-pointer" />
                    </Link>
                    <MdDeleteOutline
                      onClick={() => openModal(player)}
                      className="w-4 cursor-pointer"
                    />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for deleting user */}
      {showModal && userToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 rounded-md bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Delete User</h2>
            <p>
              Are you sure you want to delete the user{" "}
              <b>{userToDelete.name}</b>?
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
    </div>
  );
}
