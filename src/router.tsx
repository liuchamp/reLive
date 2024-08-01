import {
    useRoutes,
  } from 'react-router-dom'

  import routes from 'virtual:generated-pages-react';

import ErrorPage from "./error-page";
import MainLayout from "./components/layout/OuterLayout";


const AppRoutes = () => {
    const element = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            errorElement: <ErrorPage />,
            children: routes,
        },
        // {
        //     path: '/admin',
        //     element: <AdminLayout />,
        //     children: routes.filter(route => route.path.startsWith('/admin')),
        // },
    ]);
    console.log(element)
    return element;
};

export default AppRoutes
// const router: Router = createBrowserRouter([
//     {
//         path: "/",
//         element: <MainLayout />,
//         errorElement: <ErrorPage />,
//         children: [
//             {
//                 path: "/",
//                 element: <Home />,
//             },
//             {
//                 path: "/about",
//                 lazy: async () => {
//                     const module = await import("./pages/About")
//                     return {
//                         loader: module.default,
//                         element: <module.default />
//                     }
//                 },
//             }
//         ]
//     },
//     {
//         path: "/login",
//         lazy: async () => {
//             const module = await import("./pages/Login")
//             return {
//                 loader: module.default,
//                 element: <module.default />
//             }
//         }
//     },
//     {
//         path: "/coder",
//         lazy: async () => {
//             const module = await import("./pages/Coder")
//             return {
//                 loader: module.default,
//                 element: <module.default />
//             }
//         }
//     }
// ]);

// export default router