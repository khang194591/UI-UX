import { Box, Icon, Stack } from '@mui/material'
import { useState } from 'react'
import { MdChevronLeft } from 'react-icons/md'

import { pages } from '@/data/pages'

import NavbarItem from './NavbarItem'

function Navbar() {
  const [collapsed, setCollapsed] = useState(false)

  async function toggleCollapsed() {
    setCollapsed(!collapsed)
  }

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        width: collapsed ? '88px' : '240px',
        padding: 2,
        borderRight: '2px solid',
        transition: 'width 0.5s ease-out',
      }}
    >
      <Stack direction={'column'} gap={1}>
        {pages.map((item) => (
          <NavbarItem collapsed={collapsed} {...item} key={item.label} />
        ))}
      </Stack>
      <Stack
        component={'button'}
        onClick={toggleCollapsed}
        sx={{
          position: 'absolute',
          bottom: 12,
          right: -16,
          border: '2px solid',
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
