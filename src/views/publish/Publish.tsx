import React, {useEffect, useState} from "react";
import { CheckOutlined } from '@ant-design/icons';
import { Button } from "antd";
import { useParams, useHistory } from 'react-router-dom';
import { Post } from "../article/types";
import {getPostDetail} from "../../api/post";
import PostMetaForm from "../editor/PostMetaForm";
import './Publish.scss';

export default function Publish() {
    const [post, setPost]: [Partial<Post>, Function] = useState({});
    const params: {uuid?: string} = useParams();
    const history = useHistory();
    useEffect(() => {
        if (params.uuid) {
            getPostDetail(params.uuid).promise.then(res => {
                setPost(res);
            });
        }
    }, []);

    const goHome = () => {
        history.replace('/');
    }

    return (
        <div className="publish container mx-auto py-10 text-center">
            <CheckOutlined className="text-green-600 success-icon text-4xl" />
            <div className="text-xl py-4">
                您的文章《{post.title}》已发表成功，继续补全以下信息
            </div>
            <PostMetaForm className="mx-auto" />
            <div className="publish__footer mt-8">
                <Button type="default" size="large" onClick={goHome}>以后再说</Button>
                <Button type="primary" size="large" className="ml-8">保存</Button>
            </div>
        </div>
    );
}
