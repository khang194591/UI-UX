import { useToast } from '@/store/slides/toast'
import {
  Chip,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import {
  MdMoreVert,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineVisibility,
} from 'react-icons/md'
import { IListResponse } from '../../common/types'
import client from '../../../plugins/axios'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { setUserData, setUserFormData, setUserFormOpen } from '../user.store'
import { IUser } from '../user.types'
import { mapStatusColor } from '../user.utils'
import ConfirmDialog from '@/components/ConfirmDialog'

function UsersTable() {
  // Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>()
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const [page, setPage] = useState(0)
  const [take, setTake] = useState(5)

  const dispatch = useAppDispatch()
  const { userData } = useAppSelector((state) => state.user)

  const toast = useToast()

  const fetchData = async () => {
    const result = await client.get<IListResponse<IUser>>(
      `/users?take=${take}&skip=${5 * page}`,
    )
    dispatch(setUserData(result.data))
  }

  const handleDelete = async () => {
    try {
      const result = await client.delete<IUser>(`/user/${selectedUser?.id}`)
      toast.open({
        severity: 'success',
        message: 'Delete success',
      })
    } catch (error) {
      toast.open({
        severity: 'error',
        message: 'Some error occured',
      })
    }
  }

  const handleEdit = () => {
    handleClose()
    if (selectedUser) {
      dispatch(
        setUserFormData({ ...selectedUser, roleId: selectedUser.role?.id }),
      )
      dispatch(setUserFormOpen(true))
    }
  }

  useEffect(() => {
    fetchData()
  }, [page, take])

  return userData ? (
    <div>
      <Table>
        <TableRow></TableRow>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            {/* <TableCell>Create At</TableCell> */}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.items.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.role?.name}</TableCell>
              <TableCell>
                <Chip color={mapStatusColor(user.status)} label={user.status} />
              </TableCell>
              {/* <TableCell>{moment(user.createdAt).format('LTS')}</TableCell> */}
              <TableCell>
                <IconButton
                  onClick={(e) => {
                    handleClick(e)
                    setSelectedUser(user)
                  }}
                >
                  <Icon component={MdMoreVert} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={userData.totalItems}
              page={page}
              onPageChange={(e, val) => {
                setPage(val)
              }}
              onRowsPerPageChange={(e) => {
                setTake(parseInt(e.target.value, 10))
                setPage(0)
              }}
              rowsPerPage={take}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorReference="anchorEl"
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <Icon component={MdOutlineVisibility} />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <Icon component={MdOutlineEdit} />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <ConfirmDialog onConfirm={handleDelete}>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Icon component={MdOutlineDelete} />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </ConfirmDialog>
      </Menu>
    </div>
  ) : (
    <div>Loading</div>
  )
}

export default UsersTable
