import { EmailRounded, KeyRounded } from "@mui/icons-material"
import { Box, Button, CircularProgress, TextField } from "@mui/material"
import { useState } from "react"
import authenticateService from "@services/authenticate"
import { useNavigate } from "react-router-dom"
import api from "@services/base"

const useLogin = () => {
    const navigator = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError('')
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError('')
        setPassword(e.target.value)
    }

    const handleLogin = async () => {
        console.log(email, password)
        try {
            setLoading(true)
            const session = await authenticateService.authenticate(email, password)
            localStorage.setItem('session', JSON.stringify(session))
            api.defaults.headers.common['Authorization'] = `Bearer ${session.access_token}`
            navigator('/accounts')
        }
        catch (error: any) { // eslint-disable-line
            setError(error.response.data.error)
        }
        finally {
            setLoading(false)
        }
    }

    return {
        email,
        password,
        loading,
        error,
        handleEmailChange,
        handlePasswordChange,
        handleLogin,
    }
}

const LoginPage = () => {
    const { email, password, loading, error, handleEmailChange, handlePasswordChange, handleLogin } = useLogin()

    return (
        <Box 
            sx={{
                width: 500,
                height: 350,
                margin: 'auto',
                display: 'flex',
                flexFlow: 'column wrap',
                justifyContent: 'center',
                alignItems: 'center',

                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            <img src="/imgs/logo_collapse.svg" alt="logo" width={60}/>
            <Box
                sx={{
                    display: 'flex',
                    flexFlow: 'column wrap',
                    gap: 2,
                    width: '100%',
                }}
                py={4}
                pb={5}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                    <EmailRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        label="Email" 
                        variant="standard" 
                        fullWidth
                        value={email}
                        onChange={handleEmailChange}
                        error={error !== ''}
                        helperText={error}
                        InputProps={{
                            type: 'email'
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                    <KeyRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField 
                        label="Mật khẩu"
                        variant="standard" 
                        fullWidth 
                        value={password}
                        onChange={handlePasswordChange}
                        error={error !== ''}
                        helperText={error}
                        InputProps={{
                            type: 'password'
                        }}
                    />
                </Box>
            </Box>
            <Button 
                variant='contained' 
                fullWidth 
                sx={{ boxShadow: 'none' }}
                onClick={handleLogin}
                disabled={loading}
                startIcon={loading && <CircularProgress size={25} thickness={5}/>}
            >
                Đăng nhập
            </Button>
        </Box>
    )

}

export default LoginPage