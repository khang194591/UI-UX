import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Icon,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import {
  AiFillFacebook,
  AiOutlineGithub,
  AiOutlineGoogle,
} from 'react-icons/ai'
import { Outlet, Link as RouterLink } from 'react-router-dom'

function AuthLayout() {
  return (
    <Box sx={{ height: '100vh', width: '100vw', bgcolor: blueGrey[100] }}>
      <Container maxWidth="xs" sx={{ height: '100%', bgcolor: 'white' }}>
        <Stack
          height={'100%'}
          direction={'column'}
          px={4}
          justifyContent={'center'}
          gap={2}
        >
          <Outlet />
          <Divider textAlign="center">
            <Typography>OR</Typography>
          </Divider>
          <Stack
            direction={'row'}
            width={'100%'}
            justifyContent={'center'}
            gap={2}
          >
            <IconButton>
              <Icon component={AiOutlineGoogle} sx={{ color: 'red' }} />
            </IconButton>
            <IconButton>
              <Icon component={AiOutlineGithub} sx={{ color: 'black' }} />
            </IconButton>
            <IconButton>
              <Icon component={AiFillFacebook} sx={{ color: 'blue' }} />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default AuthLayout
