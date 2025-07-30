import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import Blogs from "../Pages/Blogs/Blogs";
import PrivateRoute from "../Private/PrivateRoute";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import FindDonor from "../Pages/FindDonor/FindDonor";
import Funds from "../Pages/Funding/Funds";
import DashboardLayout from "../Layouts/DashboardLayout";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AllUsers from "../Pages/AllUsers/AllUsers";
import MyDonationReq from "../Pages/MyDonationReq/MyDonationReq";
import AddDonationReq from "../Pages/AddDonation/AddDonationReq";
import ManageContent from "../Pages/ManageContent/ManageContent";
import MyProfile from "../Pages/MyProfile/MyProfile";
import DonationReqPage from "../Pages/DonationReqPage/DonationReqPage";
import TotalFunds from "../Pages/TotalFunds/TotalFunds";
import UpdateDonationReq from "../Pages/DonationRequests/UpdateDonationReq";
import UpdateContent from "../Pages/ManageContent/updateContent";
import BlogDetails from "../Pages/Blogs/BlogDetails";
import DonationDetails from "../Pages/DonationReqPage/DonationDetails";

const Router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            { path: '/donation-requests', element: <DonationReqPage></DonationReqPage> },
            { path: '/donation-Details/:id', element: <DonationDetails></DonationDetails> },
            { path: '/find-donor', element: <FindDonor></FindDonor> },
            { path: '/blogs', element: <Blogs></Blogs> },
            { path: '/blog/:id', element: <BlogDetails></BlogDetails> },
            { path: '/funds', element: <Funds></Funds>},
            { path: '/sign-up', element: <Register /> },
            { path: '/login', element: <Login /> },
            // { path: "/*", element: <NotFound /> },
        ]
    },
    {
        path: '/dashboard',
        element: <DashboardLayout></DashboardLayout>,
        children:[
            {
                index:true,
                element:<Dashboard></Dashboard>
            },
            { path: '/dashboard/all-users', element: <AllUsers></AllUsers> },
            { path: '/dashboard/manage-content', element: <ManageContent></ManageContent> },
            { path: '/dashboard/update-Content/:content_id', element: <UpdateContent></UpdateContent> },
            { path: '/dashboard/all-donation-requests', element: <DonationRequests></DonationRequests> },
            { path: '/dashboard/updateDonationReq/:donation_id', element: <UpdateDonationReq></UpdateDonationReq> },
            { path: '/dashboard/my-donation-requests', element: <MyDonationReq></MyDonationReq> },
            { path: '/dashboard/add-donation-request', element: <AddDonationReq></AddDonationReq> },
            { path: '/dashboard/total-funds', element: <TotalFunds></TotalFunds> },
            { path: '/dashboard/my-profile', element: <MyProfile></MyProfile> },
        ]
    }
])

export default Router;