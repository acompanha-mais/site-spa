import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import Home from './routes/Home/index.tsx'
import AboutUs from './routes/AboutUs/index.tsx'

import Error from './routes/Error/index.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'




const router = createBrowserRouter([
  {path: "/", element: <App/>, errorElement: <Error/>, children: [
    {path: "/", element: <Home/>},
    {path: "/sobre", element: <AboutUs/>}
  ]}
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
