import React, {useState} from "react";
import {Avatar, Popconfirm} from "antd";
import { ApartmentOutlined, EditOutlined, DeleteOutlined, FileOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import {ISeries} from "../../article/types";
import {relativeTimeFormatter} from "../../../utils/formatter";
import './UserSeriesCard.scss';
import { deleteSeries } from "../../../api/series";

interface IUserSeriesCardProp {
    series: Partial<ISeries>,
    onDeleteSeries: Function
}

const UserSeriesCard = (props: IUserSeriesCardProp) => {
    const { series } = props;
    const [delPopVisible, setDelPopVisible] = useState(false);
    const history = useHistory();
    const delSeries = () => {
        setDelPopVisible(false);
        if (series.uuid) {
            deleteSeries(series.uuid).then(() => {
                props.onDeleteSeries();
            });
        }
    };
    const handleSeriesClick = () => {
        // 跳转系列详情
        history.push(`/series/${series.uuid}/posts`);
    };
    return (
        <div className="user-series-card">
            <div className="user-series-card__main cursor-pointer" onClick={handleSeriesClick}>
                <Avatar className="logo mx-auto" size="large" icon={<ApartmentOutlined />} src={series.logo} />
                <div className="font-bold text-base my-1">{series.title}</div>
                <div className="text-sm text-gray-600">{series.description || '暂无描述~~'}</div>
                <div className="create-time text-sm text-gray-600">{relativeTimeFormatter(series.createdAt || '')}</div>
                <div className="series-post text-sm text-blue-600">
                    <FileOutlined className="mr-2" />
                    {`共有 ${series.postList && series.postList.length} 篇系列文章`}
                </div>
            </div>
            <div className='user-series-card__footer flex justify-between px-8 py-3 items-center border-t'>
                <EditOutlined />
                <Popconfirm
                    title="确认删除该系列吗？"
                    visible={delPopVisible}
                    onConfirm={delSeries}
                    onCancel={() => setDelPopVisible(false)}
                    okText="确认"
                    cancelText="取消"
                >
                    <DeleteOutlined onClick={() => setDelPopVisible(true)} />
                </Popconfirm>
            </div>
        </div>
    );
};

export default UserSeriesCard;
