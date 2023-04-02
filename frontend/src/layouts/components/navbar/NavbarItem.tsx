import {
  Box,
  Icon,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { blue, blueGrey, grey } from '@mui/material/colors'
import { IconType } from 'react-icons'
import { NavLink } from 'react-router-dom'

type Props = {
  to: string
  label: string
  collapsed: boolean
  icon: IconType
}

function NavbarItem({ to, label, collapsed, icon }: Props) {
  const theme = useTheme()
  return (
    <NavLink to={to} style={{ textDecoration: 'none' }} end>
      {({ isActive }) => (
        <Tooltip
          title={label}
          disableHoverListener={!collapsed}
          placement="right"
        >
          <Stack
            direction={'row'}
            alignContent="center"
            gap={1}
            sx={{
              padding: 2,
              borderRadius: 1,
              bgcolor: isActive ? blue[50] : 'inherit',
              color: isActive ? theme.palette.primary.main : blueGrey[500],
              ':hover': {
                bgcolor: isActive ? '' : blueGrey[50],
                color: isActive ? '' : blueGrey[700],
              },
            }}
          >
            <Icon component={icon} />
            {!collapsed && <Typography fontWeight={700}>{label}</Typography>}
          </Stack>
        </Tooltip>
      )}
    </NavLink>
  )
}

export default NavbarItem
