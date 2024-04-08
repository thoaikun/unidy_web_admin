import { Card, CardActionArea, CardContent, Typography } from "@mui/material"

interface IProps {
    onClick?: () => void
}

const AccountCard = ({ onClick }: IProps) => {
    return (
        <Card
            sx={{
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
            }}
        >
            <CardActionArea
                onClick={onClick}
            >
                <CardContent>
                    <Typography variant="h6" mb={1}>Account name</Typography>
                    <Typography variant="body2" color='text.secondary'>
                        Email: 
                    </Typography>
                    <Typography variant="body2" color='text.secondary'>
                        SDT:
                    </Typography>
                    <Typography variant="body2" color='text.secondary'>
                        Nghề nghiệp:
                    </Typography>
                    <Typography variant="body2" color='text.secondary'>
                        Địa chỉ:
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default AccountCard