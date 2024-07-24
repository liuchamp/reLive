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
            {
                path: "/about",
                lazy: async () => {
                    const module = await import("./pages/About")
                    return {
                        loader: module.default,
                        element: <module.default />
                    }
                },
            }
        ]
    },
    {
        path: "/login",
        lazy: async () => {
            const module = await import("./pages/Login")
            return {
                loader: module.default,
                element: <module.default />
            }
        }
    },
    {
        path: "/coder",
        lazy: async () => {
            const module = await import("./pages/Coder")
            return {
                loader: module.default,
                element: <module.default />
            }
        }
    }
]);

export default router