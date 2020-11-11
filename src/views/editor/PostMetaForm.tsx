import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Select, Upload} from "antd";
import { DoubleLeftOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from "classnames";
import './PostMetaForm.scss';

interface IPostFormProps {
    meta?: Partial<{
        title: string,
        subtitle: string,
        category: string,
        tags: string[],
        series: string,
        cover: string
    }>,
    className?: string
}

export default function PostMetaForm(props: IPostFormProps) {
    const { meta = {} } = props;
    const [subtitle, setSubtitle] = useState(meta.subtitle || '');
    const [category, setCategory] = useState(meta.category || '');
    const [tags, setTags] = useState((meta.tags && meta.tags.join(',')) || '');
    const [series, setSeries] = useState(meta.series || '');
    const [cover, setCover] = useState(meta.cover || '');
    const [isUploading, setIsUploading] = useState(false);
    const form = useRef();

    useEffect(() => {
        setSubtitle(meta.title || '');
        setSubtitle(meta.subtitle || '');
        setSubtitle(meta.category || '');
        setSubtitle((meta.tags && meta.tags.join(',')) || '');
        setSubtitle(meta.series || '');
        setSubtitle(meta.cover || '');
    }, [meta]);

    const beforeUpload = () => {
        return Promise.resolve();
    }

    function getBase64(img: Blob, callback: (imageUrl: string | null) => void) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    }

    const handleChange = (info: any) => {
        if (info.file.status === 'uploading') {
            setIsUploading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (imageUrl: string | null) => {
                setIsUploading(false);
                setCover(imageUrl || '');
            });
        }
    }

    const uploadButton = (
        <div>
            {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>添加封面</div>
        </div>
    );

    return (
        <Form ref={form as any} size="large" className={'post-meta-form text-left ' + props.className || ''}>
            <Form.Item name="cover">
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
            <Form.Item name="subtitle" className="mb-4">
                <Input type="text" placeholder="输入副标题" value={subtitle}
                       onInput={(e) => setSubtitle((e as any).target.value)}/>
            </Form.Item>
            <Form.Item name="category">
                <Select placeholder="加入类别" value={category} onChange={setCategory}>
                    <Select.Option value={1} title="前端">前端</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="tags">
                <Select mode="tags" placeholder="添加标签" value={tags} onChange={setTags} tokenSeparators={[',']}>
                    <Select.Option value={1} title="前端">Vue</Select.Option>
                    <Select.Option value={2} title="前端">React</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="series">
                <Select mode="tags" placeholder="加入系列" value={series} onChange={setSeries} tokenSeparators={[',']}>
                    <Select.Option value={1} title="前端">Vue</Select.Option>
                    <Select.Option value={2} title="前端">React</Select.Option>
                </Select>
            </Form.Item>
        </Form>
    )
}
