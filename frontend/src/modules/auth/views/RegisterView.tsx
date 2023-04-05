import {
  Alert,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

function RegisterView() {
  const navigate = useNavigate()

  const handleRegister = () => {
    navigate(`/`)
  }
  return (
    <>
      <Stack gap={1}>
        <Typography variant="h5" fontWeight={700}>
          Get started absolutely free.
        </Typography>
        <Typography variant="subtitle1">
          Already have an account?{' '}
          <Link component={RouterLink} to={`/auth/login`} fontWeight={700}>
            Sign in
          </Link>
        </Typography>
        <Alert color="info">
          Email: <b>user@user.com</b>
          <br></br>Password: <b>user@123</b>
        </Alert>
      </Stack>
      <Stack component={'form'} gap={2} mt={2} onSubmit={handleRegister}>
        <TextField label={'Fullname'}></TextField>
        <TextField label={'Email'} />
        <TextField label={'Password'} type="password" />
        <Button type="submit" size="large" color="primary">
          Create Account
        </Button>
        <Typography fontSize={12}>
          By signing up, I agree to <Link>Terms of Service</Link> and{' '}
          <Link>Privacy Policy</Link>.
        </Typography>
      </Stack>
    </>
  )
}

export default RegisterView
