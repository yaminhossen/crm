import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    RouterProvider,
    createHashRouter,
} from "react-router-dom";
import { Provider } from 'react-redux'
import store from './store/index.js';
import dashboard_routes from './routes/dashboard_routes.js';

function Component() {
    const router = createHashRouter([
        dashboard_routes,
    ]);
    return <RouterProvider router={router}></RouterProvider>
}

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <Component />
    </Provider>
);