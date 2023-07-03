import * as React from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
    Avatar,
    Typography,
    Box,
    Button,
    TextField,
    Grid,
    Link
} from '@mui/material'
import useAuth from './../hooks/useAuth'

export default function Login() {

    const { loginUser, error } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = Object.fromEntries(new FormData(event.currentTarget))
        await loginUser(data)
    }

    return (
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
                Log In
            </Typography>
            <Box sx={{ width: '30%', mt: 3 }} component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                {error ? <Typography textAlign='center' marginTop={2} component="h4" color='red'>
                    {error}
                </Typography> : <></>}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    log in
                </Button>
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="/register" variant="body2">
                            Don't have an account? sign up
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}