import React, { useState } from "react";
import { Button } from "antd";
import { LikeOutlined, StarOutlined, MessageOutlined } from '@ant-design/icons';
import {Post} from "./types";

function PostItem(props: {data: Partial<Post>}) {
    const { data } = props;
    return (
        <div className="post-item w-full lg:w-4/5 xl:4/5 bg-white shadow-md py-3 px-4 my-6 rounded-sm">
            <div className="post-item__main flex items-center justify-start">
                <div className="post-item__content flex-grow">
                    <p className="text-gray-400 text-sm">{data.createdAt || '2020-01-01'}</p>
                    <h3 className="font-bold text-xl">{data.title}</h3>
                    <h4 className="text-sm text-gray-600">{data.subtitle}</h4>
                    <p dangerouslySetInnerHTML={{ __html: data.content || '' }} />
                </div>
                {
                    data.cover && (
                        <div className="w-32">
                            <img className="h-24 mx-auto" src={data.cover} />
                        </div>
                    )
                }
            </div>
            <div className="my-2 border-t" />
            <div className="post-item__footer pb-0">
                <Button type="text" icon={<LikeOutlined />} />
                <Button type="text" icon={<StarOutlined />} />
                <Button type="text" icon={<MessageOutlined />} />
            </div>
        </div>
    );
}

export default PostItem;
