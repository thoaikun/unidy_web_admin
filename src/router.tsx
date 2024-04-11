import HomeLayout from "@components/layout/homeLayout";
import AccountsPage from "@pages/accounts";
import OrganizationDetailScreen from "@pages/accounts/[organizationId]";
import VolunteerDetailPage from "@pages/accounts/[volunteerId]";
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
            path: '/accounts/volunteers/:id',
            element: <VolunteerDetailPage />
          },
          {
            path: '/accounts/organizations/:id',
            element: <OrganizationDetailScreen />
          }
        ]
    }
])

export default router