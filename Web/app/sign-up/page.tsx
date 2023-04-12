import Image from "next/image";
import React from "react";
import Header from "../../components/Header";
import SignUp from "../../components/SignUp";

const SignUpPage = () => {
  return (
    <div className="relative bg-[url('/images/sign-up-bg.jpg')] py-24  min-h-screen bg-cover flex justify-center items-center">
      {/* @ts-expect-error Server Component */}
      <Header showLogo={true} />
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <SignUp />
    </div>
  );
};

export default SignUpPage;
