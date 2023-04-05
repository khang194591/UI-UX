import { UserStatus } from './user.types'

export const mapStatusColor = (status: UserStatus) => {
  switch (status) {
    case UserStatus.ACTIVE:
      return 'primary'
    case UserStatus.INACTIVE:
      return 'warning'
    case UserStatus.BANNED:
      return 'error'
    default:
      return 'info'
  }
}
