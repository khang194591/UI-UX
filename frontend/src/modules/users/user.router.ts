import { RouteObject } from 'react-router-dom'

export default {
  path: 'users',
  children: [
    {
      path: '',
      async lazy() {
        const { UsersView } = await import('.')
        return { Component: UsersView }
      },
    },
  ],
} as RouteObject
