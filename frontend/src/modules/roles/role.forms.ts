import { useForm } from 'react-hook-form'
import yup from '../../plugins/yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { IRole, IRoleForm } from './role.types'
import { useAppSelector } from '../../store/hooks'
import { uniq } from 'lodash'
import client from '../../plugins/axios'

export const RoleSchema = yup.object({
  id: yup.number().optional(),
  name: yup.string().required(),
  description: yup.string().optional(),
  permissions: yup.array(yup.number().required()).default([]).optional(),
})

export const useRoleForm = () => {
  const { data, checked } = useAppSelector((state) => state.role.roleForm)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRoleForm>({
    defaultValues: data,
    resolver: yupResolver(RoleSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    try {
      const method = data ? 'patch' : 'post'
      const sendValues: IRoleForm = { ...values, permissions: uniq(checked) }
      const res = await client[method]<IRole>(
        `/roles/${sendValues ? values.id : ''}`,
        sendValues,
      )
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  })

  return { register, errors, onSubmit }
}
