import Link from "next/link";
import React from "react";

const PartnerHero = () => {
  return (
    <div className="bg-gray-50 pb-10">
      <div className="relative bg-[url('/images/partner-hero.jpg')] bg-cover bg-no-repeat">
        <div className="absolute h-full w-full bg-black/70 backdrop-blur-sm"></div>
        <div className="relative mx-auto px-10 md:px-48 py-48 text-white">
          <h1 className="text-4xl md:text-5xl font-bold text-center">
            Register your fitness center on{" "}
            <span className="font-black font-sans underline text-[#f7ab0a]">
              gymZ
            </span>
          </h1>
          <h2 className="text-xl md:text-xl font-light text-center mb-3">
            and bring in additional clients
          </h2>
          <div className="mx-auto flex justify-center items-center mt-12 gap-5 flex-col md:flex-row">
            <Link
              href="/partner-with-us/new-center"
              className="w-full md:w-fit text-center font-bold text-lg shadow rounded-lg bg-[#f7ab0a] text-gray-50 hover:bg-[#f7ab0a]/90 px-10 py-2"
            >
              Register your center
            </Link>
            <Link
              href="/partner-with-us/new-trainer"
              className="w-full md:w-fit text-center font-bold text-lg shadow rounded-lg text-[#f7ab0a] bg-gray-50 hover:bg-white/90 px-10 py-2"
            >
              Register as trainer
            </Link>
          </div>
        </div>
      </div>
      <div className="container max-w-screen-lg mx-auto px-6 md:px-12 xl:px-32">
        <div className="text-center text-gray-800">
          <div
            className="block rounded-lg shadow-lg px-6 py-12 md:px-12"
            style={{
              marginTop: " -100px",
              background: "hsla(0, 0%, 100%, 0.7)",
              backdropFilter: "blur(30px)",
            }}
          >
            <h1 className="text-4xl font-bold mb-12">Required Documents</h1>

            <div className="w-full flex justify-around flex-col">
              <ul className="list-disc grid grid-cols-2 gap-5 list-inside text-left text-lg font-semibold text-gray-800">
                <li>Valid ID Proof</li>
                <li>Address Proof</li>
                <li>Bank Account Details</li>
                <li>Business Registration Certificate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerHero;
