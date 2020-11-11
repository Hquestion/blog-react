import React, {useEffect, useState} from "react";
import { CheckOutlined, SmileOutlined } from '@ant-design/icons';
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
        <div className="publish container mx-auto pt-16 text-center">
            <SmileOutlined className="text-yellow-500 success-icon text-4xl" />
            <div className="text-xl py-4">
                您的文章《{post.title}》已发表成功，继续补全以下信息
            </div>
            <PostMetaForm className="mx-auto mt-6" />
            <div className="publish__footer mt-8 mx-auto flex justify-end">
                <Button type="link" size="large" onClick={goHome}>以后再说</Button>
                <Button type="primary" size="large" className="ml-4">保存</Button>
            </div>
        </div>
    );
}
