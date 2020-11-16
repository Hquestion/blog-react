import React, {useEffect, useState} from "react";
import { getUserDrafts } from "../../api/user";
import PostItem from "../article/PostItem";

interface IUserDraftProp {
    userId: string | undefined
}

const PAGE_SIZE = 10;

const UserDrafts = (props: IUserDraftProp) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);
    const { userId } = props;
    useEffect(() => {
        if (!userId) return;
        getUserDrafts(userId, currentPage, PAGE_SIZE).then((res) => {
            setPosts((res as any).rows || []);
            setTotal((res as any).count || 0);
        });
    }, [userId, currentPage]);
    return (
        <div className="user-posts-container">
            {
                posts.map((post, index) => {
                    return (
                        <PostItem data={post} key={index} />
                    );
                })
            }
        </div>
    );
}

export default UserDrafts;
