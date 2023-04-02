import {
  Avatar,
  Box,
  Icon,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Stack,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import React from "react";
import { useState } from "react";
import {
  MdOutlineAccountCircle,
  MdOutlineDarkMode,
  MdOutlineLanguage,
  MdOutlineLogout,
  MdOutlineNotifications,
  MdSearch,
  MdSupervisedUserCircle,
  MdSupportAgent,
} from "react-icons/md";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Stack
      direction={"row"}
      gap={1}
      sx={{
        padding: 2,
        borderBottom: "2px dashed",
        borderBottomColor: blueGrey[500],
      }}
    >
      <IconButton>
        <Icon component={MdSearch} />
      </IconButton>
      <Box sx={{ flex: 1 }} />
      <Stack direction={"row"} gap={2}>
        <IconButton>
          <Icon component={MdOutlineLanguage} />
        </IconButton>
        <IconButton>
          <Icon component={MdOutlineDarkMode} />
        </IconButton>
        <IconButton>
          <Icon component={MdOutlineNotifications} />
        </IconButton>
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
            <hr style={{ border: "1px dashed", borderColor: blueGrey[200] }} />
            <MenuItem>
              <ListItemIcon>
                <Icon component={MdOutlineLogout} />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </MenuList>
        </Menu>
      </Stack>
    </Stack>
  );
}

export default Header;
