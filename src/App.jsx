import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import { Toaster } from 'react-hot-toast'


const App = () => {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<HomePage/>
    },
  ])
  return (
    <div>
      <Layout>
      <Toaster position="top-right" reverseOrder={false} />
       <RouterProvider router={route}/>
       </Layout>
    </div>
  )
}

export default App
