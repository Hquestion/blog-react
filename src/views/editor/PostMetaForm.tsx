import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Select, Upload, Button} from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './PostMetaForm.scss';
import {useLoginContext} from "../../context/login-context";
import {getTags} from "../../api/tag";
import {getSeriesList} from "../../api/series";
import {ISeries, ITag} from "../article/types";

interface IPostFormProps {
    meta?: Partial<{
        subtitle: string,
        category: string,
        tags: string[],
        series: string,
        cover: string
    }>,
    className?: string,
    onUpdateMeta: Function
}

export default function PostMetaForm(props: IPostFormProps) {
    const { meta = {}, onUpdateMeta } = props;
    const { subtitle, category, tags, series, cover } = meta;
    const [isUploading, setIsUploading] = useState(false);
    const { state } = useLoginContext();
    const [categories, setCategories]: [Partial<{ uuid: string, title: string }>[], Function] = useState([]);
    const [tagList, setTagList]: [Partial<ITag>[], Function] = useState([]);
    const [seriesList, setSeriesList]: [Partial<ISeries>[], Function] = useState([]);
    const form = useRef();

    useEffect(() => {
        if (!state.user || !state.user.uuid) {
            return;
        }
        getTags(state.user.uuid).then((res) => {
            setTagList(res as any);
        });
        getSeriesList(state.user.uuid).then((res) => {
            setSeriesList(res as any);
        });
    }, []);

    const beforeUpload = () => {
        return Promise.resolve();
    }

    const setCover = (url: string) => {
        onUpdateMeta({ ...meta, cover: url });
    }
    const setSubtitle = (subtitle: string) => {
        onUpdateMeta({ ...meta, subtitle });
    }

    const setCategory = (category: string) => {
        onUpdateMeta({ ...meta, category });
    }

    const setTags = (tags: string[]) => {
        onUpdateMeta({ ...meta, tags });
    }

    const setSeries = (series: string) => {
        onUpdateMeta({ ...meta, series });
    }

    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setIsUploading(true);
            return;
        }
        if (info.file.status === 'done') {
            setIsUploading(false);
            setCover(info.file.response);
        }
    }

    const uploadButton = (
        <div>
            {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>添加封面</div>
        </div>
    );

    const handleAddSeries = () => {}

    return (
        <Form ref={form as any} size="large" className={'post-meta-form text-left ' + props.className || ''}>
            <Form.Item>
                <Upload
                    name="files"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="/api/v1/common/upload"
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {cover ? <img src={cover} alt="cover" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item className="mb-4">
                <Input type="text" placeholder="输入副标题" value={subtitle}
                       onInput={(e) => setSubtitle((e as any).target.value)}/>
            </Form.Item>
            <Form.Item>
                <Select placeholder="所属类别" value={category} onChange={setCategory}>
                    {
                        categories.map((cate, index) => {
                            return <Select.Option value={cate.uuid as string} title={cate.title} key={index}>{cate.title}</Select.Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item>
                <Select mode="tags" placeholder="添加标签" value={tags} onChange={setTags} tokenSeparators={[',']}>
                    {
                        tagList.map((tag, index) => {
                            return <Select.Option value={tag.uuid as string} title={tag.title} key={index}>{tag.title}</Select.Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item>
                <Select placeholder="加入系列" value={series} onChange={setSeries}>
                    {
                        seriesList.map((item, index) => {
                            return <Select.Option value={item.uuid as string} title={item.title} key={index}>{item.title}</Select.Option>
                        })
                    }
                </Select>
                <Button type="link" size={"small"} className="mt-1" onClick={handleAddSeries}>添加系列</Button>
            </Form.Item>
        </Form>
    )
}
