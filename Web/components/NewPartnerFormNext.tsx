"use client";
import React, { useEffect, useState } from "react";
import states from "../data/states.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NewPartnerFormNext = () => {
  const router = useRouter();

  const [data, setData] = useState({} as any);
  const [selectedFiles, setSelectedFiles] = useState({} as any);
  const [prevData, setPrevData] = useState<{
    name: string;
    mobile: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    openTime: string;
    closeTime: string;
    email: string;
    description: string;
    daysSelected: [string];
    typeSelected: [string];
    online: boolean;
    offline: boolean;
  }>({} as any);
  const [logo, setLogo] = useState<File>();

  useEffect(() => {
    setPrevData(JSON.parse(localStorage.getItem("trainerData") as string));
  }, []);

  useEffect(() => {
    if (prevData === null) {
      router.push("/partner-with-us/new-partner");
    }
  }, []);

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any) => {
    setSelectedFiles({ ...selectedFiles, [e.target.name]: e.target.files });
  };

  const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setLogo(files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const keyCount = Object.keys(data).length;
    const selectedFilesCount = Object.keys(selectedFiles).length;

    const typesCount = prevData.typeSelected.length;

    // if (keyCount !== 2 * typesCount || selectedFilesCount !== typesCount) {
    //   toast.error("Please fill all the data");
    //   return;
    // }

    for (const key in data) {
      if (data[key] === "" || data[key] === undefined) {
        toast.error("Please fill all the fields");
        return;
      }
    }

    for (const key in selectedFiles) {
      if (selectedFiles[key].length === 0 || selectedFiles[key] === undefined) {
        toast.error("Upload all the images");
        return;
      }
    }

    if (logo === undefined) {
      toast.error("Please upload logo");
      return;
    }

    const formData = new FormData();
    if (prevData === null) return toast.error("Please fill all the fields");

    const address = `${prevData.address1}, ${prevData.address2}`;

    formData.append("name", prevData.name);
    formData.append("mobile", prevData.mobile);
    formData.append("online", prevData.online.toString());
    formData.append("offline", prevData.offline.toString());
    formData.append("address", address);
    formData.append("country", prevData.country);
    formData.append("state", prevData.state);
    formData.append("city", prevData.city);
    formData.append("openingTime", prevData.openTime);
    formData.append("closingTime", prevData.closeTime);
    formData.append("resume", logo!);
    formData.append("daysSelected", "gymz");
    if (prevData.daysSelected.length > 0) {
      prevData.daysSelected.forEach((day) => {
        formData.append("daysSelected", day);
      });
    }
    formData.append("fitnessCenterType", "gymz");
    if (prevData.typeSelected.length > 0) {
      prevData.typeSelected.forEach((day) => {
        formData.append("fitnessCenterType", day);
      });
    }
    formData.append("email", prevData.email);
    formData.append("description", prevData.description);
    for (const key in data) {
      formData.append(key, data[key]);
    }

    for (const key in selectedFiles) {
      for (let i = 0; i < selectedFiles[key].length; i++) {
        formData.append(key, selectedFiles[key][i]);
      }
    }

    const promise = await toast.promise(
      fetch("http://localhost:5000/gym_owner", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .catch((err) => console.log(err)),
      {
        pending: "Uploading Your Data Please Wait...",
      }
    );

    const response = await promise;

    if (response.success) {
      localStorage.removeItem("data");
      toast.success("Successfully added");
      router.push("/partner-with-us");
    } else {
      toast.error(`Error: ${response.toString().slice(0, 100)}`);
    }
  };

  return (
    <div className="">
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className={"z-50"}
      />
      <div className="relative z-0 w-full mb-6 group row-span-2">
        <h4 className="text-gray-700 mb-2">Select Resume</h4>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-3">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              {logo ? (
                <p className="text-sm text-gray-500 font-semibold text-center">
                  {logo.name.slice(0, 50)}...
                </p>
              ) : (
                <p className="mb-2 text-sm text-gray-500 font-semibold text-center">
                  Click to upload
                  <br />
                  <span className="text-xs text-gray-500">
                    PDF, DOC, JPG, PNG
                  </span>
                </p>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept=".pdf,.doc,.docs, image/*"
              className="hidden"
              onChange={handleLogoChange}
            />
          </label>
        </div>
      </div>
      {prevData.typeSelected && (
        <form
          action=""
          onSubmit={handleSubmit}
          className="py-7 px-10 h-full md:grid md:grid-cols-2 gap-x-8"
        >
          {prevData?.typeSelected.map((item) => {
            return (
              <React.Fragment key={item}>
                <div className="relative z-0 w-full col-span-2">
                  <h1 className="text-xl font-semibold mb-5">
                    {item.charAt(0).toUpperCase() + item.slice(1)} data
                  </h1>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    name={`${item}PricePerDay`}
                    id={`${item}PricePerDay`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                    placeholder=" "
                    onChange={handleChange}
                  />
                  <label
                    htmlFor={`${item}PricePerDay`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Price per day
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="number"
                    name={`${item}PricePerMonth`}
                    id={`${item}PricePerMonth`}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                    placeholder=" "
                    onChange={handleChange}
                  />
                  <label
                    htmlFor={`${item}PricePerMonth`}
                    className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Price per month
                  </label>
                </div>
              </React.Fragment>
            );
          })}
          <div className="relative z-0 w-full group col-span-2 flex justify-between gap-5">
            <Link
              href={"/partner-with-us/new-trainer"}
              type="submit"
              className="font-bold shadow rounded-lg bg-[#f7ab0a] text-gray-50 hover:bg-[#f7ab0a]/90 px-10 py-2"
            >
              Back
            </Link>
            <button
              type="submit"
              className="font-bold shadow rounded-lg bg-[#f7ab0a] text-gray-50 hover:bg-[#f7ab0a]/90 px-10 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewPartnerFormNext;
