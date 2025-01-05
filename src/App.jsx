// react router dom
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";

import ProtectedRoutes from "./components/ProtectedRoutes";
import { use, useEffect } from "react";
import Create from "./pages/Create";

// actions
import { action as LoginAction } from "./pages/Login";
import { action as RegisterAction } from "./pages/Register";
import { action as CreateAction } from "./pages/Create";

import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { login, authReadyAct } from "./app/features/userSlice";

function App() {
  const dispatch = useDispatch();

  const { user, authReady } = useSelector((store) => store.user);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/create",
          element: <Create />,
          action: CreateAction,
        },
        {
          path: "about/:id",
          element: <About />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
      dispatch(authReadyAct());
    });
  }, []);

  return <>{authReady && <RouterProvider router={routes} />}</>;
}

export default App;
