import HomeLayout from "@components/layout/homeLayout";
import AccountsPage from "@pages/accounts";
import AccountDetailPage from "@pages/accounts/[id]";
import CampaignsPage from "@pages/campagins";
import CampaignDetailPage from "@pages/campagins/[id]";
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
            index: true,
            path: '/campaigns',
            element: <CampaignsPage />
          },
          {
            path: '/campaigns/:id',
            element: <CampaignDetailPage />
          },
          {
            path: '/accounts',
            element: <AccountsPage />
          },
          {
            path: '/accounts/:id',
            element: <AccountDetailPage />
          }
        ]
    }
])

export default router