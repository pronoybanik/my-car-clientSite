import { createBrowserRouter } from "react-router-dom";
import AddProduct from "../../Pages/DashBoards/AddProduct/AddProduct";
import AllUsesrs from "../../Pages/DashBoards/AllUsers/AllUsesrs";
import DadhBoardLayOut from "../../Pages/DashBoards/DadhBoardLayOut/DadhBoardLayOut";
import MyOrdare from "../../Pages/DashBoards/MyOrdare/MyOrdare";
import Blogs from "../../Pages/Home/Blogs/Blogs";
import CarDetails from "../../Pages/Home/CarDetails/CarDetails";
import ErrorPage from "../../Pages/Home/ErrorPage/ErrorPage";
import FeedBack from "../../Pages/Home/FeedBack/FeedBack";
import Home from "../../Pages/Home/Home/Home";
import Review from "../../Pages/Home/Review/Review";
import SpareParts from "../../Pages/Home/SpareParts/SpareParts";
import LogIn from "../../Pages/LogIn/LogIn";
import Main from "../../Pages/Main/Main";
import SignUp from "../../Pages/SignUP/SignUp";
import Payment from "../../Payment/Payment";
import AdminRouter from "../AdminRouter/AdminRouter";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import SellerRouter from "../SellerRouter/SellerRouter";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },

            {
                path: '/spareparts',
                element: <SpareParts></SpareParts>
            },
            {
                path: '/reviews/:id',
                element: <PrivateRouter><Review></Review></PrivateRouter>,
                loader: ({ params }) => fetch(`https://car-server-site.vercel.app/services/${params.id}`)

            },
            {
                path: '/login',
                element: <LogIn></LogIn>
            },
            {
                path: '/register',
                element: <SignUp></SignUp>
            },
            {
                path: '/update/:id',
                element: <CarDetails></CarDetails>,
                loader: ({ params }) => fetch(`https://car-server-site.vercel.app/update/${params.id}`)

            },
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRouter><DadhBoardLayOut></DadhBoardLayOut></PrivateRouter>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/dashboard',
                element: <MyOrdare></MyOrdare>
            },
            {
                path: '/dashboard/addproduct',
                element: <SellerRouter><AddProduct></AddProduct></SellerRouter>
            },
            {
                path: '/dashboard/allusers',
                element: <AdminRouter><AllUsesrs></AllUsesrs></AdminRouter>
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`https://car-server-site.vercel.app/bookings/${params.id}`)
            },
            {
                path: '/dashboard/feedback',
                element: <AdminRouter><FeedBack></FeedBack></AdminRouter>,
                loader: () => fetch('https://car-server-site.vercel.app/feedback')
            }
        ]
    }
])

export default router;