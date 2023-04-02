import { Box, Icon, Stack } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { useState } from 'react'
import {
  MdChevronLeft,
  MdOutlineBadge,
  MdOutlineHome,
  MdOutlineSecurity,
} from 'react-icons/md'
import { PageName, mapLinkName } from '../../../common/utils'
import NavbarItem from './NavbarItem'
import { useToast } from '@/store/slides/toast'
import { useConfirmation } from '@/store/slides/confirmation'

const navbarItems = [
  {
    to: mapLinkName[PageName.DASHBOARD].absolutePath,
    label: 'Home',
    icon: MdOutlineHome,
  },
  {
    to: mapLinkName[PageName.USER].absolutePath,
    label: 'User',
    icon: MdOutlineBadge,
  },
  {
    to: mapLinkName[PageName.ROLE].absolutePath,
    label: 'Role',
    icon: MdOutlineSecurity,
  },
]

function Navbar() {
  const toast = useToast()
  const { isOpen, ok, cancel, open } = useConfirmation()
  const [collapsed, setCollapsed] = useState(false)

  async function toggleCollapsed() {
    // toast({
    //   open: true,
    //   message: 'Collapsed',
    // })

    const isConfirm = await open({
      title: 'Confirm',
      content: 'Collapsed',
    })
    if (isConfirm) {
      setCollapsed(!collapsed)
    }
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: collapsed ? '88px' : '240px',
        borderRightWidth: 2,
        borderRightStyle: 'dashed',
        borderRightColor: blueGrey[500],
        padding: 2,
        transition: 'all 0.5s ease-out',
      }}
    >
      <Stack direction={'column'} gap={1}>
        {navbarItems.map((item) => (
          <NavbarItem collapsed={collapsed} {...item} key={item.label} />
        ))}
      </Stack>
      <Stack
        component={'button'}
        onClick={toggleCollapsed}
        sx={{
          position: 'absolute',
          bottom: 12,
          right: -15,
          borderRadius: '9999px',
          borderColor: blueGrey[500],
          borderWidth: 2,
          borderStyle: 'dashed',
          padding: 0.5,
          bgcolor: 'white',
        }}
      >
        <Icon
          sx={{
            fontSize: 20,
            transform: collapsed ? 'rotate(0.5turn)' : '',
            transition: 'transform 0.5s ease-out',
          }}
          component={MdChevronLeft}
        />
      </Stack>
    </Box>
  )
}

export default Navbar
