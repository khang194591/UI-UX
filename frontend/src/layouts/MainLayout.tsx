import { useToast } from '@/store/slides/toast'
import { Alert, Snackbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'

function MainLayout() {
  const toastState = useAppSelector((state) => state.toast)

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
  }

  return (
    <div>
      <Outlet />
      <Snackbar
        open={toastState.isOpen || false}
        autoHideDuration={toastState.data.autoHideDuration || 3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={toastState.data.severity || 'success'}
          onClose={handleCloseToast}
          sx={{ width: '100%' }}
        >
          {toastState.data.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default MainLayout
