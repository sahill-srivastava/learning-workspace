import Header from "./Header";
import heroBanner from "../assets/netflix-hero-banner.jpg";
import { useRef, useState } from "react";
import { checkValidateData } from "../utils/validate";

// firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

const UserLogin = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleBtnClick = (e) => {
    e.preventDefault();
    //validate form data
    const msg = checkValidateData(
      isSignIn,
      name.current?.value,
      email.current.value,
      password.current.value,
    );

    console.log(msg);
    setErrorMsg(msg);

    //if msg present, error present - don't create user
    if (msg) return;

    //sign in / sign up , create user in firebase
    if (!isSignIn) {
      // sign  up logic
      console.log("Creating User...");

      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("SUCCESS");
          console.log(userCredential.user);
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + "-" + errorMessage);
        });
    } else {
      //sign in logic
    }
  };

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
            ref={name}
            type="text"
            placeholder="Full Name"
            className={`w-full bg-zinc-800 p-4  mt-8 rounded outline-1 outline-white
            ${isSignIn ? "hidden" : "block"}
            `}
          />
          <input
            ref={email}
            type="email"
            placeholder="Email Address"
            className="w-full bg-zinc-800 p-4  mt-8 rounded outline-1 outline-white"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-800 p-4  mt-8 rounded outline-1 outline-white"
          />
          <p className="text-red-600 my-4">{errorMsg}</p>
          <button
            className="w-full p-4 my-10 rounded bg-red-600"
            onClick={handleBtnClick}
          >
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
