import React from "react";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[url('/images/dashboard-bg.jpg')] bg-cover">
      {/* @ts-expect-error Server Component */}
      <Header showLogo={true} />
      <div className="grid grid-cols-6 pt-20">
        <SideBar />
        <div className="col-span-5 h-full p-5">
          <div className="bg-white w-full h-full rounded-lg shadow-lg">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
