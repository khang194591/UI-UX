import yup from '../../plugins/yup'
import { RoleSchema } from './role.forms'

export enum PermissionAction {
  C = 'C',
  R = 'R',
  U = 'U',
  D = 'D',
  CP = 'CP',
  RP = 'RP',
  UP = 'UP',
  DP = 'DP',
}

export enum PermissionResource {
  ROLE = 'ROLE',
  USER = 'USER',
}

export interface IPermission {
  id: number
  action: PermissionAction
  resource: PermissionResource
}

export interface IRole {
  id: number
  name: string
  description: string
  permissions: IPermission[]
}

export interface IRoleForm extends yup.InferType<typeof RoleSchema> {}
