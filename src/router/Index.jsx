// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/components/layouts/RootLayout";
import LoginPage from "@/pages/LoginPage";
import Login from "@/components/admin/Login";
import DashboardPage from "@/pages/DashboardPage";
import HomePage from "@/pages/Home";
import ResultPage from "@/pages/ResultPage";
import HistoryPage from "@/pages/HistoryPage";
import EducationPage from "@/pages/EducationPage";
import NotFoundPage from "@/pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/result",
        element: <ResultPage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
      {
        path: "/education",
        element: <EducationPage />
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  // {
  //   path: "/login",
  //   element: <LoginPage />,
  //   children: [
  //     {
  //       path: "",
  //       element: <Login />
  //     }
  //   ]
  // },
  // {
  //   path: "/dashboard",
  //   element: <DashboardPage />,
  // },
]);

export default router;

