import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './globals.css'


import App from './App.tsx'
import Home from './routes/Home/index.tsx'
import AboutUs from './routes/AboutUs/index.tsx'
import Members from './routes/Members/index.tsx'
import Faq from './routes/Faq/index.tsx'
import SignUpCuidador from './routes/SignUpCuidador/index.tsx'
import Login from './routes/Login/index.tsx'
import CuidadorProfile from './routes/CuidadorProfile/index.tsx'
import Contact from './routes/Contact/index.tsx'

import Error from './routes/Error/index.tsx'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'



const router = createBrowserRouter([
  {path: "/", element: <App/>, errorElement: <Error/>, children: [
    {path: "/", element: <Home/>},
    {path: "/sobre", element: <AboutUs/>},
    {path: "/time", element: <Members/>},
    {path: "/faq", element: <Faq/>},
    {path: "/cadastro", element: <SignUpCuidador/>},
    {path: "/login", element: <Login/>},
    {path: "/perfil-cuidador", element: <CuidadorProfile/>},
    {path: "/contato", element: <Contact/>}
  ]}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
