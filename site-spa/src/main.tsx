import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'


import App from './App.tsx'
import Home from './routes/Home/index.tsx'
import AboutUs from './routes/AboutUs/index.tsx'
import SignUpCuidador from './routes/SignUpCuidador/index.tsx'

import Error from './routes/Error/index.tsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'





const router = createBrowserRouter([
  {path: "/", element: <App/>, errorElement: <Error/>, children: [
    {path: "/", element: <Home/>},
    {path: "/sobre", element: <AboutUs/>},
    {path: "/cadastro/cuidador", element: <SignUpCuidador/>}
  ]}
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
