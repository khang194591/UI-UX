import MainLayout from '@/layouts/MainLayout'
import { createBrowserRouter } from 'react-router-dom'
// import { roleRouter } from '@/modules/roles'
// import { userRouter } from '@/modules/users'
import React from 'react'

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [],
  },
])

export default router
