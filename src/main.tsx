
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import App from './App';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import { AppProviders } from './components/providers/AppProviders';
import { mainRoutes } from './routes/mainRoutes';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppProviders><App /></AppProviders>,
    errorElement: <NotFound />,
    children: mainRoutes
  },
  {
    path: "/auth",
    element: <AppProviders><Auth /></AppProviders>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
