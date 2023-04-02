import { createTheme } from '@mui/material'

const theme = createTheme({
  typography: {
    fontFamily: 'Inter',
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTextField: {
      defaultProps: {
        sx: {},
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        sx: {
          textTransform: 'capitalize',
        },
      },
    },
  },
})

export default theme
