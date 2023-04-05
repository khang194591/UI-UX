import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IListResponse } from '../common/types'
import { IUser, IUserForm } from './user.types'

interface UserStoreState {
  userData: IListResponse<IUser>
  userForm: { open: boolean; data?: IUserForm }
}

const initialState: UserStoreState = {
  userData: {
    items: [],
    totalItems: 0,
  },
  userForm: {
    open: false,
    data: undefined,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<IListResponse<IUser>>) => {
      state.userData = action.payload
    },
    setUserFormOpen: (state, action: PayloadAction<boolean>) => {
      state.userForm.open = action.payload
    },
    setUserFormData: (state, action: PayloadAction<IUserForm | undefined>) => {
      state.userForm.data = action.payload
    },
  },
})

export const { setUserData, setUserFormOpen, setUserFormData } =
  userSlice.actions

export default userSlice.reducer
