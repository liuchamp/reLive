import {
    createBrowserRouter,
} from "react-router-dom";
import { Router } from "@remix-run/router";

import ErrorPage from "./error-page";
import MainLayout from "./components/layout/OuterLayout";
import Home from "./pages/Home";

const router: Router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ]
    },
]);

export default router