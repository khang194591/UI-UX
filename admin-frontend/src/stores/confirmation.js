import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'

export const ConfirmationAction = {
  OK: 'ok',
  CANCEL: 'cancel',
}

export const handleConfirmation = {
  open: createAsyncThunk(
    'confirmation/handleConfirm',
    async (data, { extra, dispatch }) => {
      dispatch(setConfirmation({ isOpen: true, data }))
      return new Promise((resolve) => {
        const unsubscribe = extra.store.subscribe(() => {
          const state = extra.store.getState()
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
    },
  ),
}

const initialState = {
  isOpen: false,
  data: {
    title: 'Title',
    content: 'Content',
    action: ConfirmationAction.OK,
  },
}

const confirmationSlice = createSlice({
  name: 'confirmation',
  initialState,
  reducers: {
    /**
     *
     * @param {typeof initialState} state
     * @param {import('@reduxjs/toolkit').PayloadAction<typeof initialState>} action
     */
    setConfirmation: (state, action) => {
      state.isOpen = action.payload.isOpen
      state.data = {
        ...state.data,
        ...action.payload.data,
      }
    },
  },
})

export const { setConfirmation } = confirmationSlice.actions

export const useConfirmation = () => {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((state) => state.confirmation)
  /**
   *
   * @param {typeof initialState} data
   * @returns
   */
  const open = async (data) => {
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
