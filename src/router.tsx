import {
    useRoutes,
} from 'react-router-dom'

import ErrorPage from "./error-page";
import MainLayout from "./components/layout/OuterLayout";

import routes from '~react-pages'
import { Suspense } from 'react';

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
    return (
        <Suspense fallback={<p>Loading...</p>}>
            {element}
        </Suspense>
    )
};

export default AppRoutes
