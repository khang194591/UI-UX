import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState, ThunkExtraArguments } from '..'
import { useAppDispatch, useAppSelector } from '../hooks'

export enum ConfirmationAction {
  OK = 'ok',
  CANCEL = 'cancel',
}

interface IConfirmationState {
  isOpen: boolean
  data: IConfirmationProps
}

export interface IConfirmationProps {
  title?: string
  content?: string
  action?: ConfirmationAction
}

export const handleConfirmation = {
  open: createAsyncThunk<
    boolean,
    IConfirmationProps,
    { extra: ThunkExtraArguments }
  >('confirmation/handleConfirm', async (data, { extra, dispatch }) => {
    dispatch(setConfirmation({ isOpen: true, data }))
    return new Promise((resolve) => {
      const unsubscribe = extra.store.subscribe(() => {
        const state: RootState = extra.store.getState()
        if (state.confirmation.data.action === ConfirmationAction.OK) {
          unsubscribe()
          resolve(true)
        }
        if (state.confirmation.data.action === ConfirmationAction.CANCEL) {
          unsubscribe()
          resolve(false)
        }
      })
    })
  }),
}

const confirmationSlice = createSlice({
  name: 'confirmation',
  initialState: {
    isOpen: false,
    data: {
      title: 'Title',
      content: 'Content',
      action: ConfirmationAction.OK,
    },
  },
  reducers: {
    setConfirmation: (state, action: PayloadAction<IConfirmationState>) => {
      state.isOpen = action.payload.isOpen
      state.data = { ...state.data, ...action.payload.data }
    },
  },
})

export const { setConfirmation } = confirmationSlice.actions

export const useConfirmation = () => {
  const dispatch = useAppDispatch()
  const { isOpen } = useAppSelector((state) => state.confirmation)

  const open = async (data: IConfirmationProps) => {
    const { payload } = await dispatch(handleConfirmation.open(data))
    return payload
  }

  const ok = () => {
    return dispatch(
      setConfirmation({
        isOpen: false,
        data: { action: ConfirmationAction.OK },
      }),
    )
  }

  const cancel = () => {
    return dispatch(
      setConfirmation({
        isOpen: false,
        data: { action: ConfirmationAction.CANCEL },
      }),
    )
  }

  return { isOpen, open, ok, cancel }
}

export default confirmationSlice.reducer
