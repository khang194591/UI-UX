import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useConfirmation } from '@/store/slides/confirmation'
import { useToast } from '@/store/slides/toast'

function MainLayout() {
  const toastState = useAppSelector((state) => state.toast)
  const confirmationState = useAppSelector((state) => state.confirmation)
  const toast = useToast()
  const confirmation = useConfirmation()

  const handleCloseToast = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    // toast({ isOpen: false })
  }

  const handleCloseConfirm = (event?: {}, reason?: string) => {
    if (reason === 'backdropClick') {
      return
    }
    confirmation.cancel()
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
      <Dialog
        open={confirmationState.isOpen || false}
        onClose={handleCloseConfirm}
      >
        <DialogTitle>{confirmationState.data.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {confirmationState.data.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmation.ok}>Ok</Button>
          <Button variant="outlined" color="error" onClick={handleCloseConfirm}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default MainLayout
