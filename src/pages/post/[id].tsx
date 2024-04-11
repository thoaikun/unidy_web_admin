import { InfoRounded } from "@mui/icons-material"
import { Avatar, Box, CircularProgress, Divider, ImageList, ImageListItem, Table, TableCell, TableRow, Typography, useTheme } from "@mui/material"
import postService from "@services/post"
import { useQuery } from "@tanstack/react-query"
import { formatDateTime } from "@utils/index"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const PostDetailPage = () => {
    const navigator = useNavigate()
    const theme = useTheme()
    const { id } = useParams()
    const [images, setImages] = useState<string[]>([])
    const { data: post, isLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => postService.getPostById(id ?? '')    
    })

    useEffect(() => {
        const images = JSON.parse(post?.linkImage ?? '[]')
        setImages(images)
    }, [post])

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 300,
                }}
            >
                <CircularProgress size={32} />
            </Box>
        )
    }

    return (
        <Box pt={2}>
            <Typography variant="h6">Chi tiết bài viết</Typography>

            <Box py={2}>
                <Divider textAlign="left">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 1, color: theme.palette.text.secondary }}>
                        <InfoRounded sx={{ width: 20, height: 20 }} />
                        <Typography variant="body1">Thông tin bài viết</Typography>
                    </Box>
                </Divider>

                <Table sx={{ marginTop: 2 }}>
                    <TableRow>
                        <TableCell width={200}>Mô tả</TableCell>
                        <TableCell>{post?.content}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell width={200}>Tâm trạng</TableCell>
                        <TableCell>{post?.status}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell width={200}>Ảnh</TableCell>
                        <TableCell>
                            {images && images.length === 0 ? 
                                'Chưa cập nhật'
                                :
                                <ImageList sx={{ width: 500 }}>
                                    {images.map((image, index) => (
                                        <ImageListItem key={index}>
                                            <img src={image} alt={`image-${index}`} loading="lazy"/>
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            }
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell width={200}>Ngày đăng</TableCell>
                        <TableCell>{formatDateTime(post?.createDate)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell width={200}>Người đăng</TableCell>
                        <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => navigator(`/accounts/volunteers/${post?.user.userId}`)}>
                            <Avatar sx={{ width: 32, height: 32}}>
                                {post?.user.fullName[0]}
                            </Avatar>
                            <Typography variant="body2">{post?.user.fullName}</Typography>
                        </TableCell>
                    </TableRow>
                </Table>
            </Box>
        </Box>
    )   
}

export default PostDetailPage