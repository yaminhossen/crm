import React from 'react'
import DashboardLayout from '../views/layouts/DashboardLayout.jsx';
import Analytics from '../views/pages/dashboard/Analytics.jsx';
import Error404 from '../views/pages/errors/Error404.jsx';

import user_routes from '../views/pages/users/config/routes.js';


const router = {
    path: "/",
    element: <DashboardLayout />,
    children: [
        {
            path: '',
            element: <Analytics></Analytics>
        },
        user_routes,
        // user roles tag
        {
            path: '*',
            element: <Error404 />
        },
    ]
};

export default router;