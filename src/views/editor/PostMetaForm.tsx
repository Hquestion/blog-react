import React, {useRef, useState} from 'react';
import {Form, Input, Select, Upload, Button} from "antd";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './PostMetaForm.scss';

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
    const form = useRef();

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

    function getBase64(img: Blob, callback: (imageUrl: string | null) => void) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    }

    const handleChange = (info: any) => {
        console.log(info);
        if (info.file.status === 'uploading') {
            setIsUploading(true);
            // getBase64(info.file.originFileObj, (imageUrl: string | null) => {
                // setIsUploading(false);
                // setCover(imageUrl || '');
            // });
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
            <Form.Item name={'category'}>
                <Select placeholder="所属类别" value={category} onChange={setCategory}>
                    <Select.Option value={1} title="前端">前端</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item>
                <Select mode="tags" placeholder="添加标签" value={tags} onChange={setTags} tokenSeparators={[',']}>
                    <Select.Option value={'1'} title="前端">Vue</Select.Option>
                    <Select.Option value={'2'} title="前端">React</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name={'series'}>
                <Select placeholder="加入系列" value={series} onChange={setSeries}>
                    <Select.Option value={1} title="前端">Vue</Select.Option>
                    <Select.Option value={2} title="前端">React</Select.Option>
                </Select>
                <Button type="link" size={"small"} className="mt-1" onClick={handleAddSeries}>添加系列</Button>
            </Form.Item>
        </Form>
    )
}
