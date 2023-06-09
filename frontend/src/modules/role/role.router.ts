import { RouteObject } from 'react-router-dom'

export default {
  path: 'role',
  children: [
    {
      path: '',
      async lazy() {
        const { RolesView } = await import('.')
        return { Component: RolesView }
      },
    },
  ],
} as RouteObject
