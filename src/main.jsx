import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Root from './Root/Root.jsx'
import ErrorPage from './ErrorPage/ErrorPage.jsx'
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import AuthContextProvider from './Provider/AuthContextProvider.jsx'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ThemeProvider } from './Provider/ThemeProvider.jsx'

// Create a client
const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthContextProvider>
            <RouterProvider router={router} />
          </AuthContextProvider>
        </HelmetProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
