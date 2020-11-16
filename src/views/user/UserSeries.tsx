import React, {useEffect, useState} from "react";
import {Button, Form, Input, Modal} from "antd";
import { ApartmentOutlined } from '@ant-design/icons';
import UserSeriesCard from "./series/UserSeriesCard";
import {ISeries} from "../article/types";
import { useLoginContext } from "../../context/login-context";
import BlogUpload from "../../components/BlogUpload";
import {createSeries, getSeriesList} from "../../api/series";
import './UserSeries.scss';

interface IUserSeriesProp {
    userId: string | undefined
}

const UserSeries = (props: IUserSeriesProp) => {
    const [series, setSeries] = useState([]);
    const [visible, setVisible] = useState(false);
    const [ seriesMeta, setSeriesMeta ]: [Partial<ISeries>, Function] = useState({});
    const [isCurrentUser, setIsCurrentUser] = useState(false);
    const { isLogin, state } = useLoginContext();
    const { userId } = props;
    const { logo, title, description } = seriesMeta;

    useEffect(() => {
        if (userId) {
            getSeries();
        }
    }, [userId]);

    useEffect(() => {
        if (isLogin() && state.user.uuid === userId) {
            setIsCurrentUser(true);
        }
    }, [userId])

    const getSeries = () => {
        if (!userId) return;
        getSeriesList(userId).then(res => {
            setSeries(res as any || []);
        })
    }

    const handleCreateSeries = () => {
        createSeries(seriesMeta).then(() => {
            setVisible(false);
            getSeries();
        });
    }

    const handleUpload = (url: string) => {
        setSeriesMeta({...seriesMeta, logo: url});
    }
    const handleDel = (index: number) => {
        const newSeries = [...series];
        newSeries.splice(index, 1);
        setSeries(() => newSeries);
    }
    return (
        <div className="user-series">
            {
                isCurrentUser && (
                    <div className="user-series__header">
                        <Button type="primary" onClick={() => setVisible(true)}>创建系列</Button>
                    </div>
                )
            }

            <div className="user-series__main flex justify-start items-start flex-wrap">
                {
                    series.map((item: Partial<ISeries>, index: number) => {
                        return (
                            <UserSeriesCard
                                series={item}
                                key={item.uuid}
                                onDeleteSeries={() => handleDel(index)}
                            />
                        )
                    })
                }
            </div>
            <Modal
                title="创建文章系列"
                visible={visible}
                onOk={handleCreateSeries}
                onCancel={() => setVisible(false)}
                okText={'提交'}
                cancelText={'取消'}
            >
                <Form size="large">
                    <Form.Item>
                        <BlogUpload sourceImg={logo} onUpload={handleUpload} />
                    </Form.Item>
                    <Form.Item className="mb-4">
                        <Input type="text" placeholder="输入标题" value={title}
                               onInput={(e) => setSeriesMeta({...seriesMeta, title: (e as any).target.value })}/>
                    </Form.Item>
                    <Form.Item className="mb-4">
                        <Input type="text" placeholder="输入描述" value={description}
                               onInput={(e) => setSeriesMeta({...seriesMeta, description: (e as any).target.value })}/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserSeries;
