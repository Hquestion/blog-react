import React, {useEffect, useState} from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Post } from "./types";
import { getPostDetail } from "../../api/post";
import {Image} from "antd";
import ForwardedMDPreviewer from "../editor/MDPreviewer";
import './PostDetail.scss';
import Author from "./Author";
import BlogComment from "./BlogComment";
import PostTools from "./PostTools";
import AboutAuthor from "./AboutAuthor";

export default function PostDetail() {
    let params: {uuid: string} = useParams();
    const history = useHistory();
    const [data, setData]: [Partial<Post>, any] = useState({});
    useEffect(() => {
        if (params.uuid) {
            getPostDetail(params.uuid).promise.then((res) => {
                setData(res);
            })
        } else {
            // 没传id，展示错误界面
        }
    }, [])
    return (
        <div className="post-detail relative container mx-auto py-4">
            <PostTools onFav={() => {}} onStar={() => {}} post={data} />
            <div className="post-detail-left w-3/4 p-4 bg-white">
                <Author user={data.user || {}} post={data} />
                <h1 className="post-title text-center relative mt-4">
                    <span className="font-bold text-3xl">{data.title}</span>
                </h1>
                {
                    data.cover && (
                        <div className="mt-4 p-5">
                            <Image src={data.cover} width={'100%'} placeholder={true}/>
                        </div>
                    )
                }
                <div className="text-left mt-4">
                    <ForwardedMDPreviewer value={data.content || ''} />
                </div>
                <Author className="mt-4" user={data.user || {}} background={true}/>
                <BlogComment post={data} postId={ params.uuid } />
            </div>
            <div className="right ml-4 flex-auto">
                <AboutAuthor user={data.user || {}} />
            </div>
        </div>
    );
}
