import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import SignIn from "./pages/signin/SignIn.tsx";
import UserContextProvider from "./contexts/UserContext.tsx";
import Points from "./pages/points/Points.tsx";
import TeamManagement from "./pages/teamManagement/TeamManagement.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard/>
    },
    {
        path: "/login",
        element: <SignIn/>
    },
    {
        path: "/points",
        element: <Points/>
    },
    {
        path: "/points/team-management",
        element: <TeamManagement/>
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <UserContextProvider>
          <RouterProvider router={router}/>
      </UserContextProvider>
  </React.StrictMode>,
)
