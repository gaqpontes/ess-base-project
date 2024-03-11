import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CreateTest from "./app/home/pages/CreateTest";
import ListTests from "./app/home/pages/ListTests";
import HelloWorld from "./app/home/pages/HelloWorld";
import UserRegister from "./app/home/pages/UserRegister";
import UserLogin from "./app/home/pages/UserLogin";
import UserUpdate from "./app/home/pages/UserUpdate";
import UserDelete from "./app/home/pages/UserDelete";
import PasswordRecovery from "./app/home/pages/Recovery";
import ChangePass from "./app/home/pages/ChangePass";

const router = createBrowserRouter([
  {
    path: "*",
    Component: CreateTest,
  },
  {
    path: "/create-test",
    Component: CreateTest,
  },
  {
    path: "/tests",
    Component: ListTests,
  },
  {
    path: "/hello-world",
    Component: HelloWorld,
  },
  {
    path: "/register",
    Component: UserRegister,
  },
  {
    path: "/login",
    Component: UserLogin,
  },
  {
    path: "/update",
    Component: UserUpdate,
  },
  {
    path: "/delete",
    Component: UserDelete,
  },
  {
    path: "/recovery",
    Component: PasswordRecovery,
  },
  {
    path: "/changepass",
    Component: ChangePass,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}
