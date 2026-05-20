// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/components/layouts/RootLayout";
import HomePage from "@/pages/Home";
import ResultPage from "@/pages/ResultPage";
import HistoryPage from "@/pages/HistoryPage";
import EducationPage from "@/pages/EducationPage";
// import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    // errorElement: <NotFoundPage />,
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
      }
    ],
  },
]);

export default router;
