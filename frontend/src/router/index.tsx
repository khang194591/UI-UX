import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import { userRouter } from '../modules/users'
import { roleRouter } from '../modules/roles'
import MainLayout from '../layouts/MainLayout'

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <AdminLayout />,
        children: [userRouter, roleRouter],
      },
    ],
  },
])

export default router
