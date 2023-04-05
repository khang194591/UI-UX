import AdminLayout from '@/layouts/AdminLayout'
import MainLayout from '@/layouts/MainLayout'
import authRouter from '@/modules/auth/auth.router'
import lodash from 'lodash'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { modulesRoutes } from './utils'

let normalRoutes: RouteObject[] = []

lodash.forEach(modulesRoutes, (module, key) => {
  if (key === 'auth') return
  normalRoutes = lodash.concat(normalRoutes, module as RouteObject[])
})

console.log(modulesRoutes)

const router = createBrowserRouter([
  {
    path: '',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <AdminLayout />,
        children: normalRoutes,
      },
    ],
  },
  authRouter,
])

console.log(router.routes)

export default router
