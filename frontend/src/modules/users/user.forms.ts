import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import client from '../../plugins/axios'
import yup from '../../plugins/yup'
import { useAppSelector } from '../../store/hooks'
import { IUser, IUserForm, UserStatus } from './user.types'
import { useToast } from '@/store/slides/toast'

export const UserSchema = yup.object({
  id: yup.number().optional(),
  email: yup.string().required(),
  name: yup.string().required(),
  status: yup.mixed<UserStatus>().oneOf(Object.values(UserStatus)).optional(),
  roleId: yup.number().min(1, 'Role is required'),
})

export const useUserForm = () => {
  const toast = useToast()
  const { data } = useAppSelector((state) => state.user.userForm)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserForm>({
    defaultValues: data,
    resolver: yupResolver(UserSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      const method = data ? 'patch' : 'post'
      const res = await client[method]<IUser>(
        `/users/${data ? values.id : ''}`,
        values,
      )
      toast.open({
        message: 'Success',
      })
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  })

  return { register, errors, onSubmit }
}
