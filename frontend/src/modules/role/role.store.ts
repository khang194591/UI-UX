import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IListResponse } from '../common/types'
import { IPermission, IRole, IRoleForm } from './role.types'

export interface RoleState {
  permissions: IPermission[]
  roleData: IListResponse<IRole>
  roleForm: { open: boolean; data?: IRoleForm; checked: number[] }
}

const initialState: RoleState = {
  permissions: [],
  roleData: {
    items: [],
    totalItems: 0,
  },
  roleForm: {
    open: false,
    data: undefined,
    checked: [],
  },
}

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRoleData: (state, action: PayloadAction<IListResponse<IRole>>) => {
      state.roleData = action.payload
    },
    setPermission: (
      state,
      action: PayloadAction<IListResponse<IPermission>>,
    ) => {
      state.permissions = action.payload.items
    },
    setRoleFormOpen: (state, action: PayloadAction<boolean>) => {
      state.roleForm.open = action.payload
    },
    setRoleFormData: (state, action: PayloadAction<IRoleForm | undefined>) => {
      state.roleForm.data = action.payload
      state.roleForm.checked = action.payload?.permissions || []
    },
    setRoleFormChecked: (state, action: PayloadAction<number[]>) => {
      state.roleForm.checked = action.payload
    },
  },
})

export const {
  setRoleData,
  setPermission,
  setRoleFormOpen,
  setRoleFormData,
  setRoleFormChecked,
} = roleSlice.actions

export default roleSlice.reducer
