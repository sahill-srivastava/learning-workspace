import Header from "./Header";
import heroBanner from "../assets/netflix-hero-banner.jpg";
import { useState } from "react";

const UserLogin = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div>
      <Header />
      <main className="relative">
        <div className="relative">
          <img
            className="w-screen h-screen  object-cover"
            src={heroBanner}
            alt="banner"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50"></div>
        </div>
        <form className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 py-20 px-10 rounded-2xl w-3/12 bg-black/75 text-white flex flex-col items-start justify-center">
          <h1 className="font-bold text-2xl">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          <input
            type="text"
            placeholder="Full Name"
            className={`w-full bg-zinc-800 p-4  mt-8 rounded outline-1 outline-white
            ${isSignIn ? "hidden" : "block"}
            `}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-zinc-800 p-4  mt-8 rounded outline-1 outline-white"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-800 p-4  mt-8 rounded outline-1 outline-white"
          />
          <button className="w-full p-4 my-10 rounded bg-red-600">
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <p onClick={toggleSignInForm} className="cursor-pointer">
            {isSignIn
              ? "New to Netflix? Sign Up Now"
              : "Already User? Sign In Now"}
          </p>
        </form>
      </main>
    </div>
  );
};

export default UserLogin;
