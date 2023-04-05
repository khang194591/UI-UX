import React from 'react'
import { useRoleForm } from '../role.forms'
import { useAppSelector } from '../../../store/hooks'
import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Stack,
  TextField,
} from '@mui/material'
import PermissionTable from './PermisionTable'

function RoleForm() {
  const { checked, data } = useAppSelector((state) => state.role.roleForm)

  const { register, errors, onSubmit } = useRoleForm()

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      component={'form'}
      p={3}
      gap={2}
      onSubmit={onSubmit}
    >
      <Box display={'grid'} gridTemplateColumns={'repeat(2,1fr)'} gap={2}>
        <TextField
          label="Name"
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Description"
          {...register('description')}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
      </Box>
      <Stack direction={'column'} gap={1}>
        <FormLabel>Permissions</FormLabel>
        <PermissionTable checkedItem={checked} />
      </Stack>
      <Stack direction={'row'} justifyContent={'end'}>
        <Button type="submit" size="medium">
          {data ? 'Update Role' : 'Create Role'}
        </Button>
      </Stack>
    </Box>
  )
}

export default RoleForm
