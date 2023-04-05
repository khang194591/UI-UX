import { RouteObject } from 'react-router-dom'

export default {
  path: 'auth',
  async lazy() {
    const { AuthLayout } = await import('@/layouts')
    return { Component: AuthLayout }
  },
  children: [
    {
      path: 'login',
      async lazy() {
        const { LoginView } = await import('.')
        return { Component: LoginView }
      },
    },
    {
      path: 'register',
      async lazy() {
        const { RegisterView } = await import('.')
        return { Component: RegisterView }
      },
    },
  ],
} as RouteObject
