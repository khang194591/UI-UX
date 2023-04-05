import {
  IconButton,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  ListItemIcon,
  Icon,
  ListItemText,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import React from 'react'
import {
  MdSupportAgent,
  MdOutlineAccountCircle,
  MdOutlineLogout,
} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function AvatarMenu() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    navigate('/auth/login')
  }
  return (
    <>
      <IconButton sx={{ p: 0 }} onClick={handleClick}>
        <Avatar
          alt="avatar"
          sx={{ bgcolor: blueGrey[900], width: 40, height: 40 }}
        >
          <MdSupportAgent />
        </Avatar>
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <Icon component={MdOutlineAccountCircle} />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <hr style={{ border: '1px dashed', borderColor: blueGrey[200] }} />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Icon component={MdOutlineLogout} />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}

export default AvatarMenu
