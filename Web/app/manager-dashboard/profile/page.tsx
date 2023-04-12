import Image from "next/image";
import React from "react";
import {
  MapPinIcon,
  ClockIcon,
  CalendarIcon,
  BanknotesIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

import RatingStars from "../../../components/RatingStars";
import Link from "next/link";

const getProfile = async () => {
  const data = {
    id: "1",
    name: "Hammar",
    image:
      "https://images.unsplash.com/photo-1584441405886-bc91be61e56a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1930&q=80",
    address: "21 Dabholi Road, Surat, Gujarat, India",
    phone: "1234567890",
    email: "fitnation@gmail.com",
    owner: "Jay Keraliya",
    rating: 4.6,
    openingTime: "10:00 AM",
    closingTime: "08:00 PM",
    openingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    price: 1000,
    photos: [
      "https://images.unsplash.com/photo-1540496905036-5937c10647cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      "https://images.unsplash.com/photo-1623874514711-0f321325f318?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    ],
  };
  return data;
};

const page = async () => {
  const profileData = await getProfile();

  return (
    <div className="p-10 grid grid-cols-12 h-full">
      <div className="col-span-3 row-span-1">
        <div className="mx-auto rounded-2xl drop-shadow-lg overflow-hidden h-72 w-72">
          <Image
            src={profileData.image}
            alt=""
            fill
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="col-span-5 px-10 py-2">
        <div>
          <h5 className="text-3xl font-bold">{profileData.name}</h5>
          <p className="text-gray-500 mt-5  items-center flex">
            <MapPinIcon className="h-5 w-5 inline-block" />
            &nbsp; &nbsp;
            <span className="text-[#0077b6] font-bold">
              {profileData.address}
            </span>
          </p>
        </div>

        <div>
          <p className="text-gray-500 mt-5 items-center flex">
            <ClockIcon className="h-5 w-5 inline-block" />
            &nbsp; &nbsp;
            <span className="text-[#0077b6] font-bold">
              {profileData.openingTime}
            </span>
            &nbsp; - &nbsp;
            <span className="text-[#0077b6] font-bold">
              {profileData.closingTime}
            </span>
          </p>
        </div>

        <div>
          <p className="text-gray-500 mt-5 items-center flex">
            <CalendarIcon className="h-5 w-5 inline-block" />
            &nbsp; &nbsp;
            <span className="text-[#0077b6] font-bold">
              {profileData.openingDays.join(", ")}
            </span>
          </p>
        </div>

        <div>
          <p className="text-gray-500 mt-5 items-center flex">
            <BanknotesIcon className="h-5 w-5 inline-block" />
            &nbsp; &nbsp;
            <span className="text-[#0077b6] font-bold">
              {profileData.price}
            </span>
            &nbsp;/&nbsp;
            <span className="text-[#0077b6] font-bold">Month</span>
          </p>
        </div>

        <div className="mt-5">
          <RatingStars rating={profileData.rating} />
        </div>
      </div>
      <div className="row-span-6 col-span-4">
        <div className="p-10 text-lg font-bold">
          <div className="mx-auto mt-5 flex items-center">
            <UserIcon className="h-5 w-5 inline-block" /> &nbsp; &nbsp;
            <span className="text-[#0077b6]">{profileData.owner}</span>
          </div>
          <div className="mx-auto mt-5">
            <PhoneIcon className="h-5 w-5 inline-block" /> &nbsp; &nbsp;
            <span className="text-[#0077b6]">+91 {profileData.phone}</span>
          </div>
          <div className="mx-auto mt-5">
            <EnvelopeIcon className="h-5 w-5 inline-block" /> &nbsp; &nbsp;
            <Link
              href={`mailto:${profileData.email}`}
              className="text-[#0077b6]"
            >
              {profileData.email}
            </Link>
          </div>
        </div>
      </div>
      <hr className="col-span-12 mb-7" />

      <div className="col-span-12 row-span-6">
        {/* <h1 className="text-3xl font-bold my-5">Photos</h1> */}
        <div className="grid grid-cols-3 gap-5 mt-5">
          {profileData.photos.map((photo) => (
            <div className="mx-auto rounded-2xl drop-shadow-lg  h-full w-full">
              <Image
                src={photo}
                alt=""
                width={500}
                height={500}
                className="h-full w-full object-cover rounded-2xl drop-shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
