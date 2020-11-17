import React, {useEffect, useState} from "react";
import { Result, Skeleton, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { getUserDrafts } from "../../api/user";
import PostItem from "../article/PostItem";
import useIsCurrentUser from "../../utils/useIsCurrentUser";

interface IUserDraftProp {
    userId: string | undefined
}

const PAGE_SIZE = 10;

const UserDrafts = (props: IUserDraftProp) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = props;
    const isCurrentUser = useIsCurrentUser(userId);
    useEffect(() => {
        if (!userId) return;
        setIsLoading(true);
        getUserDrafts(userId, currentPage, PAGE_SIZE).then((res) => {
            setPosts((res as any).rows || []);
            setTotal((res as any).count || 0);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [userId, currentPage]);
    const DraftRender = () => {
        if (isLoading) {
            return <Skeleton active />
        }
        if (total === 0) {
            return <Result
                status={404}
                subTitle={"暂无数据"}
                extra={isCurrentUser ? <Button type="primary" icon={<EditOutlined />}>写文章</Button> : null}
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
            <DraftRender />
        </div>
    );
}

export default UserDrafts;
