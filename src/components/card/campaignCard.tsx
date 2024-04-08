import { Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material"

interface IProps {
    onClick?: () => void
}

const CampaignCard = ({ onClick } : IProps) => {
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
                <CardHeader 
                    avatar={
                        <Avatar sx={{ bgcolor: 'primary.main', width: 30, height: 30 }}>
                            A
                        </Avatar>
                    }
                    title="Campaign title"
                    subheader="September 14, 2016"
                />
                <CardMedia 
                    component="img"
                    height={140}
                    image="https://images.pexels.com/photos/933624/pexels-photo-933624.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="campaign-image"
                />
                <CardContent>
                    <Typography variant="body2" color='text.secondary'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, quae.
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CampaignCard