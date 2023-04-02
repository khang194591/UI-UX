import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import yup from '../../plugins/yup'
import { UserStatus } from './user.utils'

export const UserSchema = yup.object({
  id: yup.number().optional(),
  email: yup.string().required(),
  name: yup.string().required(),
  status: yup.mixed().oneOf(Object.values(UserStatus)).optional(),
  roleId: yup.number().min(1, 'Role is required'),
})

export const useUserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: undefined,
    resolver: yupResolver(UserSchema),
  })

  const onSumbit = handleSubmit(async (values) => {
    try {
      console.log(values)
    } catch (error) {
      console.log(error)
    }
  })

  return { register, errors, onSumbit }
}
