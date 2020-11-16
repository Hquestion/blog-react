import React, {useEffect, useState} from "react";
import {Avatar} from "antd";
import {ApartmentOutlined} from "@ant-design/icons";
import { useParams } from 'react-router-dom';
import {relativeTimeFormatter} from "../../../utils/formatter";
import PostItem from "../../article/PostItem";
import {ISeries} from "../../article/types";
import './SeriesPosts.scss';
import {getSeriesDetail} from "../../../api/series";
import BlogDot from "../../../components/BlogDot";

const SeriesPosts = () => {
    const [seriesDetail, setSeriesDetail]: [Partial<ISeries>, Function] = useState({});
    const { seriesId }: {seriesId: string} = useParams();
    useEffect(() => {
        if (seriesId) {
            getSeriesDetail(seriesId).then((res) => {
                setSeriesDetail(res);
            });
        }
    }, [seriesId])
    return (
        <div className="container mx-auto mt-4">
            <div className="series-posts__header text-center pt-6 pb-2 mx-auto">
                <Avatar className="logo mx-auto" size="large" icon={<ApartmentOutlined />} src={seriesDetail.logo} />
                <div className="font-bold my-2 text-xl">{seriesDetail.title}</div>
                <div className="text-sm text-gray-400">{seriesDetail.description}</div>
                <div className="text-sm text-gray-400">
                    {relativeTimeFormatter(seriesDetail.createdAt || '')}
                    <BlogDot />
                    共 {(seriesDetail.postList && seriesDetail.postList.length) || 0} 篇文章
                </div>
            </div>
            <div className="series-posts__main my-4">
                {
                    seriesDetail.postList && seriesDetail.postList.map((post) => <PostItem data={post} key={post.uuid} />)
                }

            </div>
        </div>
    )
}

export default SeriesPosts;
