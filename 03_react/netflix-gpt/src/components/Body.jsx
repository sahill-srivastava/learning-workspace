import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./Browse";
import UserLogin from "./UserLogin";

const Body = () => {
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
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
