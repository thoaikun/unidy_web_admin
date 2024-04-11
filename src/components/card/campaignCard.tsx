import { Campaign } from "@models/campaign"
import { Card, CardHeader, Avatar, CardMedia, CardContent, Typography, CardActionArea } from "@mui/material"
import { useEffect, useState } from "react"

interface IProps {
    campaign: Campaign
    onClick?: () => void
}

const CampaignCard = ({ campaign, onClick } : IProps) => {
    const [images, setImages] = useState<string[]>([])

    useEffect(() => {
        const images = JSON.parse(campaign.link_image)
        setImages(images)
    }, [campaign])

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
                        <Avatar 
                            sx={{ bgcolor: 'primary.main', width: 30, height: 30 }}
                            src={campaign?.organization?.userProfileImage?.linkImage}
                        >
                            {campaign?.organization?.organizationName[0]}
                        </Avatar>
                    }
                    title={campaign?.title}
                    subheader={campaign?.createDate?.toString()}
                />
                <CardMedia 
                    component="img"
                    height={140}
                    image={images && images?.length > 0 ? images[0] : 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg'}
                    alt="campaign-image"
                />
                <CardContent>
                    <Typography 
                        variant="body2" 
                        color='text.secondary' 
                        paragraph
                        noWrap
                    >
                        {campaign?.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default CampaignCard