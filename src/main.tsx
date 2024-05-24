import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, redirect, RouterProvider} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import SignIn from "./pages/signin/SignIn.tsx";
import Points from "./pages/points/Points.tsx";
import Settings from "./pages/settings/Settings.tsx";
import EventSelector from "./components/eventSelector/EventSelector.tsx";
import TeamSetting from "./components/teamSetting/TeamSetting.tsx";
import GameSetting from "./components/gameSetting/GameSetting.tsx";
import Providers from "./contexts/Providers.tsx";

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
                path: "games",
                element: <EventSelector/>,
                children: [
                    {
                        path: ":docId",
                        element: <GameSetting/>
                    }
                ]
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Providers>
          <RouterProvider router={router}/>
      </Providers>
  </React.StrictMode>,
)
