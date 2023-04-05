import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { PropsWithChildren, useState } from 'react'

type Props = {
  title?: string
  content?: string
  confirmText?: string
  cancelText?: string
  onConfirm?: () => {}
  onCancel?: () => {}
} & PropsWithChildren

function ConfirmDialog({
  title = 'Confirm',
  content = 'Are you sure',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  children,
}: Props) {
  const [open, setOpen] = useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose()
              onConfirm && onConfirm()
            }}
          >
            {confirmText}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              handleClose()
              onCancel && onCancel()
            }}
          >
            {cancelText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ConfirmDialog
