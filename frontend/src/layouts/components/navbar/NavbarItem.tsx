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
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('common')

  return (
    <NavLink to={to} style={{ textDecoration: 'none' }} end>
      {({ isActive }) => (
        <Tooltip
          title={t(label)}
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
              bgcolor: isActive
                ? theme.palette.primary.main.concat('33')
                : 'inherit',
              color: isActive
                ? theme.palette.primary.main
                : theme.palette.grey[500],
              ':hover': {
                bgcolor: isActive ? '' : theme.palette.grey[200],
                color: isActive ? '' : theme.palette.grey[700],
              },
            }}
          >
            <Icon component={icon} />
            <Typography
              noWrap
              fontWeight={700}
              sx={{
                opacity: collapsed ? 0 : 1,
                transition: 'opacity 0.5s ease-out',
              }}
            >
              {t(label)}
            </Typography>
          </Stack>
        </Tooltip>
      )}
    </NavLink>
  )
}

export default NavbarItem
