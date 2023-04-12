"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Connect to backend and login logic
    router.push("/");
    // ! For testing
    console.log(data);
  };

  const handleForgotPassword = () => {
    // TODO: Connect to backend and forgot password logic
  };

  const handleGoogleLogin = () => {
    // TODO: Connect to backend and google login logic
  };

  const handleFacebookLogin = () => {
    // TODO: Connect to backend and facebook login logic
  };

  const handleAppleLogin = () => {
    // TODO: Connect to backend and apple login logic
  };

  return (
    <div className="bg-white max-w-screen-sm rounded-lg shadow-lg">
      <div className="border-b-2 p-7">
        <h1 className="text-3xl font-semibold font-serif text-center">LOGIN</h1>
      </div>
      <div className="px-10 py-7 pb-2">
        <form action="" className="w-80" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              onChange={handleChange}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              onChange={handleChange}
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 mb-6">
            Forgot your password?{" "}
            <a
              onClick={handleForgotPassword}
              className="font-medium text-black hover:underline dark:text-black hover:cursor-pointer"
            >
              Reset It
            </a>
          </p>
          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="bg-black/90 py-3 w-11/12 rounded-lg text-white font-semibold shadow-md outline-none focus:outline-black hover:bg-black transition-all duration-300"
            >
              Login
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-black hover:underline dark:text-black"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
      {/*  */}
      <div className="inline-flex items-center justify-center w-full">
        <hr className="w-full h-px bg-gray-200 border" />
        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2">
          OR
        </span>
      </div>
      {/*  */}
      <div className="px-10 py-7">
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-11/12 mx-auto text-white shadow-md bg-[#d0463b] hover:bg-[#d0463b]/80 focus:ring-4 focus:outline-none focus:ring-[#d0463b]/50 font-medium rounded-lg text-sm px-10 py-3 text-center flex justify-center items-center mb-2 transition-all duration-300"
        >
          <svg
            className="w-4 h-4 mr-2 -ml-1"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
        </button>
        <button
          type="button"
          onClick={handleFacebookLogin}
          className="w-11/12 mx-auto text-white shadow-md bg-[#3b5998] hover:bg-[#3b5998]/80 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-10 py-3 text-center flex justify-center items-center mb-2 transition-all duration-300"
        >
          {" "}
          <svg
            className="w-4 h-4 mr-2 -ml-1"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="facebook-f"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 320 512"
          >
            <path
              fill="currentColor"
              d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
            ></path>
          </svg>
          Sign in with Facebook
        </button>
        <button
          type="button"
          onClick={handleAppleLogin}
          className="w-11/12 mx-auto text-white shadow-md bg-[#050708]/90 hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-10 py-3 text-center flex justify-center items-center mb-2 transition-all duration-300"
        >
          <svg
            className="w-5 h-5 mr-2 -ml-1"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="apple"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              fill="currentColor"
              d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
            ></path>
          </svg>
          Sign in with Apple
        </button>
      </div>
    </div>
  );
};

export default Login;
