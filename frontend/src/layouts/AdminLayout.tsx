import { Box, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Navbar from './components/navbar/Navbar'
import { useEffect } from 'react'
import { useAppDispatch } from '../store/hooks'
import client from '../plugins/axios'
import { setPermission, setRoleData } from '../modules/role/role.store'
import { IListResponse } from '../modules/common/types'
import { IPermission, IRole } from '../modules/role/role.types'

function AdminLayout() {
  const dispatch = useAppDispatch()

  const fetchPermission = async () => {
    try {
      const response = await client.get<IListResponse<IPermission>>(
        '/roles/permissions',
      )
      dispatch(setPermission(response.data))
    } catch (error) {
      console.log(error)
    }
  }
  const fetchRole = async () => {
    try {
      const response = await client.get<IListResponse<IRole>>('/roles')
      dispatch(setRoleData(response.data))
    } catch (error) {
      console.log(error)
    }
  }
  const fetchAll = async () => {
    await fetchPermission()
    await fetchRole()
  }

  useEffect(() => {
    fetchAll()
  }, [])

  return (
    <Box sx={{ height: '100vh', width: '100vw' }}>
      <Stack direction={'row'} height={'100%'}>
        <Navbar />
        <Stack direction={'column'} flex={1}>
          <Header />
          <Box flex={1} padding={4} overflow={'auto'}>
            <Outlet />
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}

export default AdminLayout
