import { Box, Icon, IconButton, Stack } from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import {
  MdOutlineDarkMode,
  MdOutlineLanguage,
  MdOutlineNotifications,
  MdSearch,
} from 'react-icons/md'
import AvatarMenu from './menu/AvatarMenu'
import LanguageMenu from './menu/LanguageMenu'

function Header() {
  return (
    <Stack
      direction={'row'}
      gap={1}
      sx={{
        padding: 2,
        borderBottom: '2px solid',
      }}
    >
      <IconButton>
        <Icon component={MdSearch} />
      </IconButton>
      <Box sx={{ flex: 1 }} />
      <Stack direction={'row'} gap={2}>
        <LanguageMenu />
        <IconButton>
          <Icon component={MdOutlineDarkMode} />
        </IconButton>
        <IconButton>
          <Icon component={MdOutlineNotifications} />
        </IconButton>
        <AvatarMenu />
      </Stack>
    </Stack>
  )
}

export default Header
