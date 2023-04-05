import { Box, Button, MenuItem, Stack, TextField } from '@mui/material'
import DashedBox from '../../../components/DashedBox'
import { useAppSelector } from '../../../store/hooks'
import AvatarUpload from './AvatarUpload'
import { useUserForm } from '../user.forms'
import { IUserForm, UserStatus } from '../user.types'

function UserFormView() {
  const { items } = useAppSelector((state) => state.role.roleData)
  const data = useAppSelector((state) => state.user.userForm.data)
  const { register, errors, onSubmit } = useUserForm()

  return (
    <Stack direction={{ md: 'column', lg: 'row' }} gap={3} alignItems={'start'}>
      <AvatarUpload />
      <DashedBox
        flex={1}
        height={'fit'}
        component={'form'}
        onSubmit={onSubmit}
        p={3}
        borderRadius={2}
      >
        <Box display={'grid'} gridTemplateColumns={'repeat(2,1fr)'} gap={2}>
          <TextField
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            select
            label="Status"
            defaultValue={data?.status || UserStatus.INACTIVE}
            {...register('status')}
            error={!!errors.status}
            helperText={errors.status?.message}
          >
            {[...Object.values(UserStatus)].map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Role"
            defaultValue={data?.roleId || 0}
            {...register('roleId')}
            error={!!errors.roleId}
            helperText={errors.roleId?.message}
          >
            <MenuItem disabled value={0}>
              Select Role
            </MenuItem>
            {items.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Stack direction={'row'} mt={2} justifyContent={'end'}>
          <Button type="submit" size="medium">
            {data ? 'Update User' : 'Create User'}
          </Button>
        </Stack>
      </DashedBox>
    </Stack>
  )
}

export default UserFormView
