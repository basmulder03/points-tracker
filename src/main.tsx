import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import SignIn from "./pages/signin/SignIn.tsx";
import UserContextProvider from "./contexts/UserContext.tsx";
import Points from "./pages/points/Points.tsx";
import Settings from "./pages/settings/Settings.tsx";
import EventSelector from "./components/eventSelector/EventSelector.tsx";
import TeamSetting from "./components/teamSetting/TeamSetting.tsx";
import PartSetting from "./components/partSetting/PartSetting.tsx";

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
        path: "/settings",
        element: <Settings/>,
        children: [
            {
                index: true,
                loader: async () => redirect("teams")
            },
            {
                path: "teams",
                element: <EventSelector/>,
                children: [
                    {
                        path: ":docId",
                        element: <TeamSetting/>
                    }
                ]
            },
            {
                path: "parts",
                element: <EventSelector/>,
                children: [
                    {
                        path: ":docId",
                        element: <PartSetting/>
                    }
                ]
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <UserContextProvider>
          <RouterProvider router={router}/>
      </UserContextProvider>
  </React.StrictMode>,
)
