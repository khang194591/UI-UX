import { useConfirmation } from '@/stores/confirmation'
import { Button } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useSelector } from 'react-redux'

function MainLayout() {
  const { ok, cancel,open } = useConfirmation()
  const { isOpen, data: confirmationData } = useSelector(
    (state) => state.confirmation,
  )
  const handleCloseConfirm = (event, reason) => {
    if (reason === 'backdropClick') {
      return
    }
    cancel()
  }
  return (
    <div>
      <Button
            onClick={async () => {
              const isOk = open()
            }}
          >
            Ok
          </Button>
      <Dialog open={isOpen} onClose={handleCloseConfirm}>
        <DialogTitle>{confirmationData.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmationData.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              ok()
            }}
          >
            Ok
          </Button>
          <Button variant="outlined" color="error" onClick={handleCloseConfirm}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Outlet />
    </div>
  )
}

export default MainLayout
