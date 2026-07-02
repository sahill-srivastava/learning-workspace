import logo from "../assets/netflix-logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(store => store.user)


  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="absolute w-screen z-50 px-5 py-2.5 bg-gradient-to-b from-black flex justify-between gap-4">
      <img className="w-40" src={logo} alt="logo" />

      <div className="w-fit flex items-center gap-4">
        <img
          className="cursor-pointer w-10 rounded-4xl"
          src={user?.photoURL}
          alt="user-icon"
        />
        <button
          onClick={handleSignOut}
          className="text-white bg-red-600 rounded p-2 cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
