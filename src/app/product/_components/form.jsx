"use client";

import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import { CiWarning } from "react-icons/ci";
import { MdUpdate } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

export default function Form({ product, categories }) {
  const token = Cookies.get("currentUser");
  const router = useRouter();

  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState(null);
  const [validationForm, setValidationForm] = useState({
    validName: "",
    validPrice: "",
    validDesc: "",
    validBrand: "",
    validStock: "",
    validImage: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(
    product
      ? product
      : {
          name: "",
          price: 0,
          desc: "",
          category_id: "",
          brand: "",
          stock: 0,
          shipping: false,
          featured: false,
          color: ["#000000"],
          images: [],
        },
  );

  function handleOnChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (e.target.value) {
      setValidationForm("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      setValidationForm((prev) => ({
        ...prev,
        validName: "Name cannot be empty",
      }));
      setIsLoading(false);
      return;
    }
    if (isNaN(form.price)) {
      setValidationForm((prev) => ({
        ...prev,
        validPrice: "Stock cannot be empty and must be a number",
      }));
      setIsLoading(false);
      return;
    }

    if (!form.desc.trim()) {
      setValidationForm((prev) => ({
        ...prev,
        validDesc: "Description cannot be empty",
      }));
      setIsLoading(false);
      return;
    }
    if (!form.brand.trim()) {
      setValidationForm((prev) => ({
        ...prev,
        validBrand: "Brand cannot be empty",
      }));
      setIsLoading(false);
      return;
    }
    if (isNaN(form.stock)) {
      setValidationForm((prev) => ({
        ...prev,
        validStock: "Stock cannot be empty and must be a number",
      }));
      setIsLoading(false);
      return;
    }

    if (form.images.length === 0) {
      setValidationForm((prev) => ({
        ...prev,
        validImage: "Image cannot be empty",
      }));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const headers = {
      Authorization: token,
    };

    try {
      if (product) {
        const respone = await axios.patch(
          `/api/products/${product.id}`,
          {
            name: form.name,
            price: form.price,
            desc: form.desc,
            category_id: form.category_id,
            brand: form.brand,
            stock: form.stock,
            shipping: form.shipping,
            featured: form.featured,
            color: form.color,
            images: form.images,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${token}`,
            },
          },
        );
        setNotification(`Product has been update`);
        setNotificationType("update");

        setTimeout(() => setNotification(null), 3000);
      } else {
        const response = await axios.post(
          "/api/products",
          {
            ...form,
            price: parseInt(form.price, 10), // Mengubah string menjadi integer
            stock: parseInt(form.stock, 10), // Mengubah string menjadi integer
            featured: JSON.parse(form.featured),
            shipping: JSON.parse(form.shipping),
          },
          {
            headers,
          },
        );
        setNotification(`Product has been created`);
        setNotificationType("create");

        setTimeout(() => setNotification(null), 3000);
      }

      router.push("/product");
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

  async function handleImages(e) {
    setIsLoading(true);
    const files = Array.from(e.target.files);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const { data } = await axios.post("/api/images", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });

      setForm({
        ...form,
        images: [...form.images, ...data.images],
      });
    } catch (error) {
      console.log(error);
      setNotification(`Error: ${error.message || "Something went wrong!"}`);
      setNotificationType("error");

      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteImage(filename, index) {
    setIsLoading(true);

    try {
      await axios.delete(`/api/images/${filename}`);

      const updatedPreviews = [...form.images];
      updatedPreviews.splice(index, 1);
      setForm({
        ...form,
        images: updatedPreviews,
      });
    } catch (error) {
      setNotification(`Error: ${error.message || "Something went wrong!"}`);
      setNotificationType("error");

      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsLoading(false);
    }
  }

  function handleOnChangeColor(e, i) {
    const newColors = [...form.color];
    newColors[i] = e.target.value;
    setForm({
      ...form,
      color: newColors,
    });
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
              <IoCreateOutline  className="text-3xl" />
            ) : notificationType === "update" ? (
              <MdUpdate className="text-3xl" />
            ) : (
              <CiWarning className="text-3xl" />
            )}
            <span>{notification}</span>
          </div>
        </div>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="space-y-2 rounded-lg bg-[#1C2434] p-5 shadow-xl dark:bg-white">
            <h3 className="text-[1.25rem] font-bold text-white dark:text-black">
              Contact Form
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="h-0.5 w-full bg-white p-0 dark:bg-black"></div>

              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="text-white dark:text-black">Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleOnChange}
                      value={form.name}
                      placeholder="Title"
                      disabled={isLoading}
                      className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                        isLoading
                          ? "cursor-not-allowed bg-transparent"
                          : "bg-white"
                      }`}
                    />
                    {validationForm.validName && (
                      <p className="text-sm text-rose-600">
                        {validationForm.validName}
                      </p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="text-white dark:text-black">Price</label>
                    <input
                      required
                      disabled={isLoading}
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleOnChange}
                      placeholder="Rp. 0"
                      className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                        isLoading
                          ? "cursor-not-allowed bg-transparent"
                          : "bg-white"
                      }`}
                    />
                    {validationForm.validPrice && (
                      <p className="text-sm text-rose-600">
                        {validationForm.validPrice}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="text-white dark:text-black">Stock</label>
                    <input
                      required
                      disabled={isLoading}
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleOnChange}
                      placeholder="0"
                      className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                        isLoading
                          ? "cursor-not-allowed bg-transparent"
                          : "bg-white"
                      }`}
                    />
                    {validationForm.validStock && (
                      <p className="text-sm text-rose-600">
                        {validationForm.validStock}
                      </p>
                    )}
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="text-white dark:text-black">Brand</label>
                    <input
                      required
                      disabled={isLoading}
                      type="text"
                      placeholder="Brand"
                      name="brand"
                      value={form.brand}
                      onChange={handleOnChange}
                      className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                        isLoading
                          ? "cursor-not-allowed bg-transparent"
                          : "bg-white"
                      }`}
                    />
                    {validationForm.validBrand && (
                      <p className="text-sm text-rose-600">
                        {validationForm.validName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="text-white dark:text-black">Category</label>
                  <select
                    required
                    disabled={isLoading}
                    value={form.category_id}
                    defaultChecked={form.category_id}
                    name="category_id"
                    onChange={handleOnChange}
                    className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                      isLoading
                        ? "cursor-not-allowed bg-transparent"
                        : "bg-white"
                    }`}
                  >
                    <option
                      value=""
                      selected
                      className="text-body dark:text-bodydark"
                    >
                      Select Category
                    </option>
                    {categories.map((category) => (
                      <option
                        key={category.id}
                        value={category.id}
                        className="text-body dark:text-bodydark"
                      >
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="text-white dark:text-black">
                      Featured
                    </label>
                    <select
                      required
                      name="featured"
                      value={form.featured}
                      onChange={handleOnChange}
                      className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                        isLoading
                          ? "cursor-not-allowed bg-transparent"
                          : "bg-white"
                      }`}
                    >
                      <option
                        value={true}
                        className="text-body dark:text-bodydark"
                      >
                        Yes
                      </option>
                      <option
                        value={false}
                        className="text-body dark:text-bodydark"
                      >
                        No
                      </option>
                    </select>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="text-white dark:text-black">
                      Shipping
                    </label>
                    <select
                      required
                      name="shipping"
                      value={form.shipping}
                      onChange={handleOnChange}
                      className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                        isLoading
                          ? "cursor-not-allowed bg-transparent"
                          : "bg-white"
                      }`}
                    >
                      <option
                        value={"true"}
                        className="text-body dark:text-bodydark"
                      >
                        Yes
                      </option>
                      <option
                        value={false}
                        className="text-body dark:text-bodydark"
                      >
                        No
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="text-white dark:text-black">Color</label>
                  <div className="flex items-center gap-x-3">
                    {form.color.map((colors, index) => (
                      <input
                        required
                        disabled={isLoading}
                        key={index}
                        type="color"
                        value={colors}
                        onChange={(e) => handleOnChangeColor(e, index)}
                        className="cursor-pointer rounded-lg border-[1.5px] border-transparent bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                      />
                    ))}
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => {
                        setForm({
                          ...form,
                          color: [...form.color, "#000000"],
                        });
                      }}
                      className="rounded bg-primary px-3 py-1 font-medium text-white hover:bg-opacity-90"
                    >
                      Add
                    </button>
                    {form.color.length > 1 && (
                      <button
                        disabled={isLoading}
                        onClick={() => {
                          if (form.color.length !== 1) {
                            setForm({
                              ...form,
                              color: [...form.color].slice(
                                0,
                                form.color.length - 1,
                              ),
                            });
                          }
                        }}
                        className="rounded bg-danger px-3 py-1 font-medium text-white hover:bg-opacity-90"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Images
                  </label>
                  <input
                    disabled={isLoading}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImages}
                    className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                      isLoading
                        ? "cursor-not-allowed bg-transparent"
                        : "bg-white"
                    }`}
                  />
                  {validationForm.validImage && (
                    <p className="text-sm text-rose-600">
                      {validationForm.validImage}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="text-white dark:text-black">
                    Description
                  </label>
                  <textarea
                    disabled={isLoading}
                    rows={6}
                    name="desc"
                    value={form.desc}
                    onChange={handleOnChange}
                    className={`border-gray-300 mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                      isLoading
                        ? "cursor-not-allowed bg-transparent"
                        : "bg-white"
                    }`}
                  ></textarea>
                  {validationForm.validDesc && (
                    <p className="text-sm text-rose-600">
                      {validationForm.validDesc}
                    </p>
                  )}
                </div>

                <div className="mx-8 flex justify-between">
                  <Link href={"/product"}>
                    <button className="transform rounded-lg bg-red px-3 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-[#df1818]">
                      Cancel
                    </button>
                  </Link>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="transform rounded-lg bg-green-500 px-3 py-2 font-bold text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-green-600"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="grid h-fit grid-cols-2 gap-5">
          {form.images.map((image, i) => (
            <div key={i} className="relative aspect-square rounded-md bg-white">
              <Image
                fill
                src={`/api/images/${image}`}
                alt="Preview"
                className="rounded-md object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <button
                onClick={() => handleDeleteImage(image, i)}
                className="absolute right-[-10px] top-[-10px] flex h-[30px] w-[30px] items-center justify-center rounded-full bg-red text-white transition-all duration-150 hover:bg-opacity-90"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
