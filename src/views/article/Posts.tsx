import React, {useCallback, useEffect, useRef, useState} from 'react';
import PostItem from "./PostItem";
import {Post} from "./types";
import BlogCategory from "../../components/layout/BlogCategory";
import {Pagination} from "antd";
import { getPostsByPage } from "../../api/post";

const PAGE_SIZE = 10;

function Posts() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const ref: any = useRef();
    useEffect(() => {
        getPosts(currentPage);
        window.scrollTo(0,0);
    }, [currentPage]);

    const totalPage = useCallback(() => {
        return Math.ceil(total / PAGE_SIZE);
    }, [total]);

    const getPosts = (page: number) => {
        getPostsByPage(page, PAGE_SIZE).promise.then((res: unknown) => {
            setPosts((res as any).rows || []);
            setTotal((res as any).count || 0);
        });
    }

    const handlePageChange = (page: number,) => {
        setCurrentPage(page);
    }

    return (
        <>
            <BlogCategory />
            <div className="container mx-auto py-4" ref={ref}>
                <div className="posts-container w-full lg:w-4/5 xl:4/5">
                    {
                        posts && posts.map((item: Post) => (
                            <PostItem data={item} key={item.uuid} />
                        ))
                    }
                    {
                        totalPage() > 1 && <Pagination
                            className="pb-4 text-center"
                            pageSize={PAGE_SIZE}
                            current={currentPage}
                            defaultCurrent={currentPage}
                            defaultPageSize={PAGE_SIZE}
                            total={total}
                            onChange={handlePageChange}
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default Posts;
