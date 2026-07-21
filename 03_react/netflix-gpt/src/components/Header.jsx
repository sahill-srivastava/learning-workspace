import logo from "../assets/netflix-logo.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLang } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          }),
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => {
      // unsubscribe when component unmounts
      unsubscribe();
    };
  }, []);

  const handleGptSearch = () => {
    //Toggle GPT Search

    dispatch(toggleGptSearchView());
  };

  const handleLangChange = (e) => {
    dispatch(changeLang(e.target.value))
  }

  return (
    <div className="absolute w-screen z-50 px-5 py-2.5 bg-gradient-to-b from-black flex justify-between gap-4">
      <img className="w-40" src={logo} alt="logo" />

      {user && (
        <div className="w-fit flex items-center gap-4">
          <select
          onChange={handleLangChange}
          className="bg-white/90 p-1 rounded cursor-pointer">
            {SUPPORTED_LANGUAGES.map(lang =>  <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>
          <button
            onClick={handleGptSearch}
            className="text-white bg-yellow-600 rounded p-2 px-3 cursor-pointer"
          >
            GPT Search
          </button>
          <img
            className="cursor-pointer w-10"
            src={user?.photoURL}
            alt="user-icon"
          />
          <button
            onClick={handleSignOut}
            className="text-white bg-red-600 rounded p-2 px-3 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
