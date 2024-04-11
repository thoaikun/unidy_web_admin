import PostCard from "@components/card/postCard"
import DateFilter from "@components/dateFilter/dateFilter"
import useDateFilterController from "@components/dateFilter/useDateFilterController"
import EmptyPlaceholder from "@components/emptyPlaceholder/emptyPlaceholder"
import { Box, CircularProgress, Pagination } from "@mui/material"
import postService from "@services/post"
import { useQuery } from "@tanstack/react-query"
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const usePosts = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const dateFilterController = useDateFilterController()
    const [page, setPage] = useState(1)
    const { data, isLoading } = useQuery({
        queryKey: ['posts', page, dateFilterController.fromDate, dateFilterController.toDate],
        queryFn: async () => {
            const fromDate = dateFilterController.fromDate.format('YYYY-MM-DDTHH:mm:ss').toString()
            const toDate = dateFilterController.toDate.format('YYYY-MM-DDTHH:mm:ss').toString()

            return postService.getPosts(fromDate, toDate, page-1, 10)
        }
    })

    const onChangePage = (_: ChangeEvent<unknown>, page: number) => {
        setPage(page)
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        setSearchParams(params)
    }

    useEffect(() => {
        setPage(searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1)
    }, [searchParams])

    useEffect(() => {
        const p = searchParams.get('page')
        if (p) {
            setPage(parseInt(p))
        }
        else {
            const params = new URLSearchParams(searchParams)
            params.set('page', page.toString())
            setSearchParams(params)
        }
    }, [])

    return {
        posts: data?.content,
        totalPages: data?.totalPages,
        isLoading,
        dateFilterController,
        page,
        onChangePage
    }
}

const PostsPage = () => {
    const navigator = useNavigate()
    const { 
        posts,
        totalPages,
        page,
        isLoading,
        onChangePage,
        dateFilterController 
    } = usePosts()

    return (
        <>
            <DateFilter controller={dateFilterController}/>

            {isLoading &&
                (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 400
                        }} 
                    >
                        <CircularProgress size={32} />
                    </Box>
                )
            }

            {
                !isLoading && posts && posts?.length > 0 &&
                    (
                        <>
                            <Box
                                sx={{ 
                                    marginTop: 3,
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 300px))',
                                    justifyContent: 'center',
                                    gap: 2
                                }}
                            >
                                {posts?.map(post => (
                                    <PostCard 
                                        key={post.postId} 
                                        post={post}
                                        onClick={() => navigator(`/posts/${post.postId}`)}
                                    />
                                ))}
                            </Box>

                            <Pagination
                                sx={{ 
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: 3
                                }}
                                count={totalPages}
                                page={page}
                                onChange={onChangePage}
                                color="primary"
                            />
                        </>
                    )
            }
            {
                !isLoading && (!posts || posts?.length === 0) &&
                    (
                        <EmptyPlaceholder />
                    )
                
            }
        </>
    )
}

export default PostsPage