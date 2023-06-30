import * as React from 'react';
import {useState} from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';


const defaultTheme = createTheme();

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

function SignUp({ onSign }){
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [bio, setBio] = useState("")
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    const handleSubmit = (e) => {
        const newUserObj = {
            first_name: first_name,
            last_name: last_name,
            bio: bio,
            email: email,
            username: username,
            password: password
        }
        e.preventDefault()
        fetch('/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserObj)
        })
        .then((r) => {
            if(r.ok){
                r.json().then(onSign)
                alert('Account created succesfully, returning to home....')
                history.push('/boats')
            } else {
                alert('Something went wrong. Please try again')
            }
        })
    }

    return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    input type="text" value={first_name} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    input type="text" value={last_name} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Username"
                    label="Username"
                    name="Username"
                    autoComplete="Username"
                    input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username'
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="Bio"
                    label="Bio"
                    name="Bio"
                    autoComplete="Bio"
                    input type="text" value={bio} onChange={(e) => setBio(e.target.value)} placeholder='Bio this can be changed later'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="new-password"
                    input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'
                  />
                </Grid>
                <Grid item xs={12}>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to='/signin' href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    )
}
export default SignUp