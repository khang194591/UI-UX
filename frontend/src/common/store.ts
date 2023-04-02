import { AlertColor } from '@mui/material'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState, ThunkExtraArguments } from '../store'

export interface IToastProps {
  open?: boolean
  autoHideDuration?: number
  severity?: AlertColor
  message?: string
}

export interface IConfirmProps {
  open?: boolean
  title?: string
  content?: string
  callback?: () => any
  action?: 'ok' | 'cancel'
}

interface CommonStoreState {
  toast: IToastProps
  confirm: IConfirmProps
}

const initialState: CommonStoreState = {
  toast: {
    open: false,
    autoHideDuration: 3000,
    severity: 'info',
    message: '',
  },
  confirm: {
    open: false,
    title: '',
    content: '',
    action: 'cancel',
  },
}

export const handleConfirm = {
  open: createAsyncThunk<
    boolean,
    IConfirmProps,
    { extra: ThunkExtraArguments }
  >('handleConfirm', async (data, { extra, dispatch }) => {
    dispatch(setConfirm({ ...data, open: true }))
    return new Promise<boolean>((resolve) => {
      const unsubscribe = extra.store.subscribe(() => {
        const state: RootState = extra.store.getState()
        if (state.common.confirm.action === 'ok') {
          unsubscribe()
          resolve(true)
        }
        if (state.common.confirm.action === 'cancel') {
          unsubscribe()
          resolve(false)
        }
      })
    })
  }),
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<IToastProps>) => {
      state.toast = { ...action.payload }
    },
    setConfirm: (state, action) => {
      state.confirm = { ...state.confirm, ...action.payload }
    },
  },
})

export const { setToast, setConfirm } = commonSlice.actions

export default commonSlice.reducer
