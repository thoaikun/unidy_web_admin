import { Post } from "@models/post"
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from "@mui/material"
import { formatDateTime } from "@utils/index"
import { useEffect, useState } from "react"

interface IProps {
    post: Post
    onClick?: () => void
}

const PostCard = ({ post, onClick }: IProps) => {
    const [images, setImages] = useState<string[]>([])

    useEffect(() => {
        const images = JSON.parse(post.linkImage)
        setImages(images)
    }, [post])

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
                        >
                            {post.user.fullName[0]}
                        </Avatar>
                    }
                    title={post.user.fullName}
                    subheader={formatDateTime(post.createDate)}
                />
                <CardMedia 
                    component="img"
                    height={140}
                    image={images && images.length > 0 ? images[0] : 'https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg'}
                    alt="campaign-image"
                />
                <CardContent>
                    <Typography 
                        variant="body2" 
                        color='text.secondary' 
                        paragraph
                        noWrap
                    >
                        {post.content}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default PostCard