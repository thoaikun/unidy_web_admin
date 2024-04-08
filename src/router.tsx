import HomeLayout from "@components/layout/homeLayout";
import LoginPage from "@pages/login";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/',
        element: <HomeLayout />,
        children: [
          {
            path: '/campaigns',
            element: <div>Campaigns page</div>
          },
          {
            path: '/contacts',
            element: <div>Contacts page</div>
          }
        ]
    }
])

export default router