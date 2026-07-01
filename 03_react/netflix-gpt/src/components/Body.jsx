import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Browse from "./Browse";
import UserLogin from "./UserLogin";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removerUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <UserLogin />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  (useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user: ", user);
        const { uid, email, displayName } = user.uid;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removerUser());
        navigate("/");
      }
    });
  }),
    []);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
