import yup from '../../plugins/yup'
import { IRole } from '../role/role.types'
import { UserSchema } from './user.forms'

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED',
}

// Data nhận được từ server
export interface IUser {
  id: number
  email: string
  name: string
  status: UserStatus
  createdAt: string
  updatedAt: string
  role?: IRole
}

// Data sẽ gửi lên server
export interface IUserForm extends yup.InferType<typeof UserSchema> {}
