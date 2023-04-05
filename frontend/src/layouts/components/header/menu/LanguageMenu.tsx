import { languages } from '@/data/languages'
import { SupportLanguage } from '@/plugins/i18n'
import {
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
} from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MdOutlineLanguage } from 'react-icons/md'

function LanguageMenu() {
  const { t, i18n } = useTranslation('common')

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleChangeLanguage = (lang: SupportLanguage) => {
    handleClose()
    i18n.changeLanguage(lang)
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <Icon component={MdOutlineLanguage} />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuList>
          {languages.map((item) => (
            <MenuItem
              selected={i18n.language === item.lang}
              onClick={() => handleChangeLanguage(item.lang)}
            >
              <ListItemIcon>
                <Icon component={item.icon} />
              </ListItemIcon>
              <ListItemText>{t(item.label)}</ListItemText>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  )
}

export default LanguageMenu
