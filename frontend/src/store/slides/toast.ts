import { AlertColor } from '@mui/material'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { store } from '..'
import { useAppDispatch, useAppSelector } from '../hooks'

export interface IToastState {
  isOpen: boolean
  data: IToastProps
}

export interface IToastProps {
  autoHideDuration?: number
  severity?: AlertColor
  message?: string
}

const toastSlice = createSlice({
  name: 'toast',
  initialState: {
    isOpen: false,
    data: {
      autoHideDuration: 3000,
      severity: 'success',
    },
  } as IToastState,
  reducers: {
    setToast: (state, action: PayloadAction<IToastState>) => {
      state.isOpen = action.payload.isOpen
      state.data = { ...state.data, ...action.payload.data }
    },
  },
})

export const { setToast } = toastSlice.actions

export const useToast = () => {
  const dispatch = useAppDispatch()
  const { isOpen, data } = useAppSelector((state) => state.toast)

  const open = (data: IToastProps) => {
    dispatch(setToast({ isOpen: true, data }))
  }

  const close = () => {
    dispatch(setToast({ isOpen: false, data }))
  }

  return { isOpen, open, close }
}

export default toastSlice.reducer
