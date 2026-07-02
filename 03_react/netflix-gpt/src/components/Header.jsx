import logo from "../assets/netflix-logo.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();


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
          className="cursor-pointer"
          src="https://occ-0-4409-3647.1.nflxso.net/dnm/api/v6/SO2HoVCx33X8phZh2pZZmQ4QgNY/AAAABS8sWFjSyj1zyfgcnGamqyJ1E2ZubZGo8dndCM_ipf_5UpmVlkuf8IXzQlmPZQqTMWNjWukESRdLkFGHnf7zbY3MJCO3r4s.png?r=229"
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
