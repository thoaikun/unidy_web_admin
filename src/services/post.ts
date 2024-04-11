import { Pageable } from "@models/pageable"
import { Post } from "@models/post"
import api from "./base"

const getPosts = async (
    fromDate: string,
    toDate: string,
    pageNumber?: number,
    pageSize?: number,
) => {
    const payload = {
        fromDate,
        toDate,
        pageNumber: pageNumber ?? 0,
        pageSize: pageSize ?? 10,
    }

    const response = await api.post("api/v1/admin/posts", payload)
    return response.data as Pageable<Post>
}

const getPostById = async (id: string) => {
    const response = await api.get(`api/v1/admin/posts/${id}`)
    return response.data as Post
}

const postService = {
    getPosts,
    getPostById,
}

export default postService