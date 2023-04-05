import {
  Alert,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

function LoginView() {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate(`/`)
  }

  return (
    <>
      <Stack gap={1}>
        <Typography variant="h5" fontWeight={700}>
          Sign in to {import.meta.env.VITE_APP_TITLE}
        </Typography>
        <Typography variant="subtitle1">
          New user?{' '}
          <Link component={RouterLink} to={`/auth/register`} fontWeight={700}>
            Create an account
          </Link>
        </Typography>
        <Alert color="info">
          Email: <b>user@user.com</b>
          <br></br>Password: <b>user@123</b>
        </Alert>
      </Stack>
      <Stack component={'form'} gap={2} mt={2} onSubmit={handleLogin}>
        <TextField label={'Email'} />
        <TextField label={'Password'} type="password" />
        <Link
          component={RouterLink}
          to={`/auth/forgot-password`}
          fontWeight={700}
          variant="subtitle2"
          alignSelf={'end'}
        >
          Forgot password
        </Link>
        <Button type="submit" size="large" color="primary">
          Login
        </Button>
      </Stack>
    </>
  )
}

export default LoginView
