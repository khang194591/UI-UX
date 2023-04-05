import {
  Chip,
  Icon,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  capitalize,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import {
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineVisibility,
} from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setRoleFormData, setRoleFormOpen } from '../role.store'
import { PermissionResource } from '../role.types'

function RoleTable() {
  const dispatch = useAppDispatch()

  const { items } = useAppSelector((state) => state.role.roleData)
  return (
    <div>
      <Table sx={{ border: '2px dashed', borderColor: blueGrey[100] }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  {Object.values(PermissionResource).map((resource) => {
                    if (
                      item.permissions
                        .map((rowItem) => rowItem.resource)
                        .includes(resource)
                    ) {
                      return (
                        <Chip
                          color="primary"
                          label={`${capitalize(resource)}`}
                          key={resource}
                        />
                      )
                    }
                  })}
                </Stack>
              </TableCell>
              <TableCell
                align="center"
                sx={{ display: 'flex', flexDirection: 'row' }}
              >
                <IconButton color="info">
                  <Icon component={MdOutlineVisibility} />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => {
                    dispatch(
                      setRoleFormData({
                        ...item,
                        permissions: item.permissions.map((p) => p.id),
                      }),
                    )
                    dispatch(setRoleFormOpen(true))
                  }}
                >
                  <Icon component={MdOutlineEdit} />
                </IconButton>
                <IconButton color="error">
                  <Icon component={MdOutlineDelete} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default RoleTable
