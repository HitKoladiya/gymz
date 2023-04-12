import Image from "next/image";
import React from "react";
import Header from "../../../components/Header";
import NewCenterForm from "../../../components/NewCenterForm";

const NewCenter = () => {
  return (
    <div className="bg-[url('/images/new-center-bg.jpg')] bg-cover bg-black">
      <div className="fixed bg-black/60 min-h-screen w-screen backdrop-blur-md"></div>
      {/* @ts-expect-error Server Component */}
      <Header showLogo={true} />
      <div className="relative py-7 md:w-9/12 mx-7 md:mx-auto">
        <div className="bg-white shadow-lg rounded-lg my-20 lg:grid grid-cols-10">
          <div className="relative rounded-lg col-span-3 h-72 md:h-full">
            <Image
              src="/images/new-center.jpg"
              width={500}
              height={500}
              priority={true}
              alt={""}
              className="h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
            />
          </div>
          <div className="col-span-7 py-7 px-0 md:px-9 rounded-lg bg-red-">
            <h1 className="text-4xl font-bold text-center">
              Register your fitness center on{" "}
              <span className="font-black font-sans underline text-[#f7ab0a]">
                gymZ
              </span>
            </h1>
            <NewCenterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCenter;
