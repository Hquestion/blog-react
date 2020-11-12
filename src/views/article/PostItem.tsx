import React, { useState } from "react";
import { Button } from "antd";
import { LikeOutlined, StarOutlined, MessageOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import {Post} from "./types";
import { relativeTimeFormatter, simplifiedMarkdown } from "../../utils/formatter";

function PostItem(props: {data: Partial<Post>}) {
    const { data } = props;
    return (
        <div className="post-item w-full lg:w-4/5 xl:4/5 bg-white shadow-md py-3 px-4 my-6 rounded-sm">
            <div className="post-item__main flex items-center justify-start">
                <div className="post-item__content flex-grow">
                    <p className="text-gray-400 text-xs">
                        <span className="text-gray-500">{data.user && data.user.nickname}</span>
                        最近更新于
                        <span className="italic">{relativeTimeFormatter(data.updatedAt as string)}</span>
                    </p>
                    <h3 className="font-bold text-xl">
                        <Link to={`/post/${ data.uuid }`}>{data.title}</Link>
                    </h3>
                    <h4 className="text-sm text-gray-600">{data.subtitle}</h4>
                    <p dangerouslySetInnerHTML={{ __html: simplifiedMarkdown(data.content || '') }} />
                </div>
                {
                    data.cover && (
                        <div className="w-32 text-right">
                            <img className="h-24 object-cover mx-auto" src={data.cover} />
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
