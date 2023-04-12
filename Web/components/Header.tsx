import Link from "next/link";
import React from "react";
import LoginButton from "./LoginButton";
import Profile from "./Profile";

const isLogged = async () => {
  return true;
};

const getUser = async () => {
  return {
    name: "Hammer",
    email: "koladiyahit45@gmail.com",
  };
};

const Header = async (props: any) => {
  const loginStatus = await isLogged();
  const { name, email } = await getUser();

  return (
    <header className="absolute top-0 w-screen bg-black/80 backdrop-blur-sm text-white flex justify-between px-10 p-5 z-20">
      {props.showLogo ? (
        <Link href={"/"} className="font-estherilla text-4xl">
          gymZ
        </Link>
      ) : (
        <div className="text-transparent"> </div>
      )}
      <div>
        {loginStatus ? <Profile name={name} email={email} /> : <LoginButton />}
      </div>
    </header>
  );
};

export default Header;
