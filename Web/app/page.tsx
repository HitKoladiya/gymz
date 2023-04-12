import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="bg-[url('/images/header-img.jpg')] bg-cover w-screen h-screen">
      {/* @ts-expect-error Server Component */}
      <Header key={2} showLogo={true} />
    </div>
  );
};

export default Home;
