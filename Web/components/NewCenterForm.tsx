"use client";
import React, { useEffect, useState } from "react";
import states from "../data/states.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const NewCenterForm = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const router = useRouter();

  const types = ["gym", "yoga", "dance"];

  const [state, setState] = useState("");
  const [daysSelected, setDaysSelected] = useState<string[]>([]);
  const [typeSelected, setTypeSelected] = useState<string[]>([]);
  const [data, setData] = useState({
    email: "koladiyahit45@gmail.com",
    name: "",
    mobile: "",
    address1: "",
    address2: "",
    country: "India",
    state: "disabled",
    city: "disabled",
    openTime: "",
    closeTime: "",
  });

  useEffect(() => {
    if (localStorage.getItem("data")) {
      const data = JSON.parse(localStorage.getItem("data")!);
      setData(data);
      setDaysSelected(data.daysSelected);
      setTypeSelected(data.typeSelected);
      setState(data.state);
    }
  }, []);

  const showToast = (message: string, type: string) => {
    if (type === "success") {
      toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (type === "error") {
      toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "state") setState(value);

    setData((prev) => ({ ...prev, [name]: value }));

    setData((prev) => ({
      ...prev,
      daysSelected,
    }));
  };

  const handleDayChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (daysSelected.includes(value)) {
      await setDaysSelected(daysSelected.filter((day) => day !== value));
    } else {
      await setDaysSelected([...daysSelected, value]);
    }
  };

  const handleTypeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (typeSelected.includes(value)) {
      await setTypeSelected(typeSelected.filter((type) => type !== value));
    } else {
      await setTypeSelected([...typeSelected, value]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const {
      name,
      mobile,
      address1,
      country,
      state,
      city,
      openTime,
      closeTime,
    } = data;

    if (
      !name ||
      !mobile ||
      !address1 ||
      !country ||
      state === "disabled" ||
      city === "disabled" ||
      !openTime ||
      !closeTime ||
      !daysSelected.length
    ) {
      showToast("Please fill all the fields", "error");
      return;
    }

    if (data.mobile.length !== 10 || isNaN(Number(data.mobile))) {
      showToast("Please enter a valid mobile number", "error");
      return;
    }

    if (data.openTime >= data.closeTime) {
      showToast("Please enter a valid time", "error");
      return;
    }

    const dataToSend = {
      name,
      mobile,
      address1: data.address1,
      address2: data.address2,
      country,
      state,
      city,
      openTime,
      closeTime,
      daysSelected,
      typeSelected,
      email: data.email,
    };

    localStorage.setItem("data", JSON.stringify(dataToSend));

    router.push("/partner-with-us/new-center/next");
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
      <form
        action=""
        className="py-7 px-10 h-full md:grid md:grid-cols-2 gap-x-8"
        onSubmit={handleSubmit}
      >
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="name"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            value={data.name}
            onChange={handleChange}
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Fitness Center Name
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="mobile"
            name="mobile"
            id="mobile"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            value={data.mobile}
            onChange={handleChange}
          />
          <label
            htmlFor="mobile"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Mobile Number
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group row-span-2">
          <h4 className="text-gray-700 mb-2">Select Type of fitness center</h4>
          <ul className="grid grid-cols-3 md:grid-cols-3 gap-2 mt-2">
            {types.map((type) => (
              <li key={type}>
                <input
                  type="checkbox"
                  id={type}
                  value={type}
                  className="peer hidden"
                  name="days"
                  checked={typeSelected.includes(type)}
                  onChange={handleTypeChange}
                />
                <label
                  htmlFor={type}
                  className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-gray-600"
                >
                  <div className="w-full text-sm font-semibold text-center">
                    {type}
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-0 w-full mb-6 group col-span-2">
          <input
            type="address1"
            name="address1"
            id="address1"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            value={data.address1}
            onChange={handleChange}
          />
          <label
            htmlFor="address1"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Address Line 1
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group col-span-2">
          <input
            type="address2"
            name="address2"
            id="address2"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            value={data.address2}
            onChange={handleChange}
          />
          <label
            htmlFor="address2"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Address Line 2
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <label htmlFor="underline_select" className="sr-only">
            State
          </label>
          <select
            id="underline_select"
            name="state"
            onChange={handleChange}
            value={data.state}
            className="block py-2.5 px-0 w-full text-sm text-gray- bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value={"disabled"} disabled>
              Choose a State
            </option>
            {Object.keys(states)
              .sort()
              .map((state: string) => (
                <option value={state} key={state}>
                  {state}
                </option>
              ))}
          </select>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <label htmlFor="underline_select" className="sr-only">
            City
          </label>
          <select
            id="underline_select"
            name="city"
            value={data.city}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray- bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value={"disabled"} disabled>
              Choose a city
            </option>
            {state &&
              states[state as keyof typeof states]
                .sort((a, b) => (a.city > b.city ? 1 : -1))
                .map((city) => (
                  <option value={city.city} key={city.city + city.id}>
                    {city.city}
                  </option>
                ))}
          </select>
        </div>

        <div className="relative z-0 w-full mb-6 group row-span-2">
          <h4 className="text-gray-700">Select Working Days</h4>
          <ul className="grid grid-cols-3 gap-2 mt-2">
            {days.map((day) => (
              <li key={day}>
                <input
                  type="checkbox"
                  id={day}
                  value={day}
                  className="peer hidden"
                  name="days"
                  checked={daysSelected.includes(day)}
                  onChange={handleDayChange}
                />
                <label
                  htmlFor={day}
                  className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-gray-600"
                >
                  <div className="w-full text-sm font-semibold text-center">
                    {day.slice(0, 3)}
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="time"
            name="openTime"
            id="openTime"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            value={data.openTime}
            onChange={handleChange}
          />
          <label
            htmlFor="openTime"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Opening Time
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="time"
            name="closeTime"
            id="closeTime"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
            placeholder=" "
            value={data.closeTime}
            onChange={handleChange}
          />
          <label
            htmlFor="closeTime"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Closing Time
          </label>
        </div>

        <div className="relative z-0 w-full group col-span-2 flex justify-end">
          <button
            type="submit"
            className="font-bold shadow rounded-lg bg-[#f7ab0a] text-gray-50 hover:bg-[#f7ab0a]/90 px-10 py-2"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewCenterForm;
