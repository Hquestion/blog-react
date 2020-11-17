import React, {useEffect, useState} from "react";
import { Result, Skeleton, Button } from 'antd';
import { getUserPosts } from "../../api/user";
import PostItem from "../article/PostItem";
import useIsCurrentUser from "../../utils/useIsCurrentUser";

interface IUserPostProp {
    userId: string | undefined
}

const PAGE_SIZE = 10;

const UserPost = (props: IUserPostProp) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = props;
    const isCurrentUser = useIsCurrentUser(userId);
    useEffect(() => {
        if (!userId) return;
        setIsLoading(true);
        getUserPosts(userId, currentPage, PAGE_SIZE).then((res) => {
            setPosts((res as any).rows || []);
            setTotal((res as any).count || 0);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [userId, currentPage]);
    const PostRender = () => {
        if (isLoading) {
            return <Skeleton active />
        }
        if (total === 0) {
            return <Result
                status={404}
                subTitle={"暂无数据"}
                extra={isCurrentUser ? <Button type="primary">写文章</Button> : null}
            />
        }
        return (
            <>
                {
                    posts.map((post, index) => {
                        return (
                            <PostItem data={post} key={index} />
                        );
                    })
                }
            </>
        )
    }
    return (
        <div className="user-posts-container">
            <PostRender />
        </div>
    );
}

export default UserPost;
