import { EmailRounded, KeyRounded } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"

const LoginPage = () => {
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
                    <TextField label="Email" variant="standard" fullWidth/>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
                    <KeyRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField label="Mật khẩu" variant="standard" fullWidth />
                </Box>
            </Box>
            <Button variant='contained' fullWidth sx={{ boxShadow: 'none' }}>Đăng nhập</Button>
        </Box>

    )

}

export default LoginPage