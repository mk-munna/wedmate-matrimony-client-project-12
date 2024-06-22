import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Root from './Root/Root.jsx';
import ErrorPage from './ErrorPage/ErrorPage.jsx';
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/Login/Login.jsx';
import AuthContextProvider from './Provider/AuthContextProvider.jsx';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ThemeProvider } from './Provider/ThemeProvider.jsx';
import BioDatas from './Pages/BioDatas/BioDatas.jsx';
import ViewDetails from './Pages/ViewDetails/ViewDetails.jsx';
import { Toaster } from 'react-hot-toast';
import SignUp from './Pages/SignUp/SignUp.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import UserHome from './Dashboard/User/UserHome.jsx';
import EditBioData from './Dashboard/User/EditBioData.jsx';
import NewBioData from './Dashboard/User/NewBioData.jsx';
import NewBioData2 from './Dashboard/User/NewBioData2.jsx';
import ViewBioData from './Dashboard/User/ViewBioData.jsx';
import FavouriteBioDatas from './Dashboard/User/FavouriteBioDatas.jsx';
import AnimatedCursor from "react-animated-cursor"
import AdminHome from './Dashboard/Admin/AdminHome.jsx';
import AllUsers from './Dashboard/Admin/AllUsers.jsx';
import ApprovedPremium from './Dashboard/Admin/ApprovedPremium.jsx';
import AdminRoute from './Routes/AdminRoute.jsx';
import SuccessStoryForm from './Dashboard/User/SuccessStoryForm .jsx';
import AdminSuccessStories from './Dashboard/Admin/AdminSuccessStories .jsx';
import CheckoutPage from './Dashboard/User/CheckoutPage.jsx';
import Contact from './Pages/ContactUs/Contact.jsx';
import AboutUs from './Pages/AboutUs/AboutUs.jsx';
import MyContactRequest from './Dashboard/User/MyContactRequest.jsx';
import ApproveContactRequest from './Dashboard/Admin/ApproveContactRequest.jsx';
// Create a query client
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/bio-datas',
        element: <BioDatas />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/sign-up',
        element: <SignUp />
      },
      {
        path: '/details/:id',
        element: < PrivateRoute ><ViewDetails /></PrivateRoute>,
      },
      
      {
        path: '/contact',
        element: < PrivateRoute ><Contact /></PrivateRoute>,
      },
      {
        path: '/about-us',
        element: <AboutUs></AboutUs>
      },
      
      {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
          {
            path: 'user-home',
            element: <UserHome />
          },
          {
            path: 'dashboard/:email',
            element: <ViewDetails />
          },
          {
            path: 'edit-biodata',
            element: <EditBioData />
          },
          {
            path: 'view-biodata',
            element: <ViewBioData></ViewBioData>
          },
          {
            path: 'contact-request',
            element: <MyContactRequest></MyContactRequest>
          },
          {
            path: 'favourites',
            element: <FavouriteBioDatas></FavouriteBioDatas>
          },
          {
            path: 'got-married',
            element: <SuccessStoryForm></SuccessStoryForm>
          },
          {
            path: 'checkout/:biodataId',
            element: <CheckoutPage></CheckoutPage>
          },
          // admin route
          {
            path: 'admin-home',
            element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
          },
          {
            path: 'manage-users',
            element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
          },
          {
            path: 'approved-premium',
            element: <ApprovedPremium></ApprovedPremium>
          },
          {
            path: 'success-story',
            element: <AdminSuccessStories></AdminSuccessStories>
          },
          {
            path: 'approved-contact-request',
            element: <ApproveContactRequest></ApproveContactRequest>
          },
          
        ]
      }
    ]
  },
  {
    path: 'new-biodata',
    element: <NewBioData></NewBioData>
  },
  {
    path: 'new-biodata-next-step',
    element: <NewBioData2></NewBioData2>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthContextProvider>
            <AnimatedCursor
              innerSize={20}
              color='27, 114, 97'
              outerAlpha={0.2}
              innerScale={0}
              outerScale={7}
              showSystemCursor={true}
              clickables={[
                'a',
                'input[type="text"]',
                'input[type="email"]',
                'input[type="number"]',
                'input[type="submit"]',
                'input[type="image"]',
                'label[for]',
                'select',
                'textarea',
                'button',
                '.link',
              ]}
            />
            <RouterProvider router={router} />
            <Toaster />
          </AuthContextProvider>
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
