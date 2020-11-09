import React from 'react';
import {useGet} from "../../utils/useAxios";
import PostItem from "./PostItem";
import {Post} from "./types";
import BlogCategory from "../../components/layout/BlogCategory";

function Posts() {
    console.log('render111');
    const data = useGet('/posts', {params: {page:1 , pageSize: 10}})

    return (
        <>
            <BlogCategory />
            <div className="container mx-auto">
                {
                    data.result && data.result.map((item: Post) => (
                        <PostItem data={item} key={item.uuid} />
                    ))
                }
            </div>
        </>
    );
}

export default Posts;
