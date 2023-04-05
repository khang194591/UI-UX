import React from 'react'
import ReactDOM from 'react-dom/client'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import './plugins/i18n'
import router from './router'
import { store } from './store'
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
