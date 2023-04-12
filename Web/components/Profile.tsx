"use client";
import { Menu } from "@headlessui/react";
import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const Profile = (props: { name: string; email: string }) => {
  return (
    <Menu as={"div"} className="">
      <Menu.Button className={"flex items-center gap-2"}>
        <div className="h-10 w-10 rounded-full">
          <UserCircleIcon className="text-white" />
        </div>
        <h5 className="font-bold text-lg">Jay Keraliya</h5>
      </Menu.Button>
      <Menu.Items
        className={
          "absolute right-2 lg:right-24 w-72 shadow-xl bg-white flex flex-col text-black rounded-lg gap-y-3 py-8 px-14 mt-6"
        }
      >
        <div className="h-12 w-12 rounded-full mx-auto">
          <UserCircleIcon className="" />
        </div>
        <div className="mx-auto">
          <h4 className="font-bold text-xl text-center">{props.name}</h4>
          <h6 className="font-light text-sm mt-2 text-center">{props.email}</h6>
        </div>
        <hr className="border-1 border-black/30" />
        <Menu.Item>
          <Link
            className={`font-semibold rounded text-center text-dark hover:underline transition duration-300`}
            href="/manager-dashboard"
          >
            My Account
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link
            className={`font-semibold rounded text-center text-dark hover:underline transition duration-300`}
            href="/partner-with-us"
          >
            Became a Partner
          </Link>
        </Menu.Item>
        <hr className="border-1 border-black/30" />
        <Menu.Item>
          <a
            className={`font-semibold px-7 py-2 rounded shadow-lg text-center text-white bg-secondary-2/90 hover:bg-secondary-2`}
            href="/account-settings"
          >
            Logout
          </a>
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default Profile;
