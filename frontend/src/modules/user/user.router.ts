import { RouteObject } from 'react-router-dom'

export default {
  path: 'user',
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
