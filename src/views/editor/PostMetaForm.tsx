import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Select} from "antd";
import { DoubleLeftOutlined } from '@ant-design/icons';
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
    }>
}

export default function PostMetaForm(props: IPostFormProps) {
    const { meta = {} } = props;
    const [title, setTitle] = useState(meta.title || '');
    const [subtitle, setSubtitle] = useState(meta.subtitle || '');
    const [category, setCategory] = useState(meta.category || '');
    const [tags, setTags] = useState((meta.tags && meta.tags.join(',')) || '');
    const [series, setSeries] = useState(meta.series || '');
    const [cover, setCover] = useState(meta.cover || '');
    const [isShow, setIsShow] = useState(false);
    const form = useRef();

    useEffect(() => {
        setTitle(meta.title || '');
        setTitle(meta.subtitle || '');
        setTitle(meta.category || '');
        setTitle((meta.tags && meta.tags.join(',')) || '');
        setTitle(meta.series || '');
        setTitle(meta.cover || '');
    }, [meta]);

    const moreClasses = classNames({
        "text-blue-400 cursor-pointer text-sm my-2 more": true,
        'is-shown': isShow
    })

    const handleToggle = () => {
        setIsShow(!isShow);
    }

    return (
        <Form ref={form as any} size="middle" className="post-meta-form">
            <Form.Item name="title" className="mb-4">
                <Input type="text" placeholder="标题" required={true} value={title}
                       onInput={(e) => setTitle((e as any).target.value)}/>
            </Form.Item>
            <div className={moreClasses} onClick={handleToggle}>
                更多
                <DoubleLeftOutlined className="toggle-icon" />
            </div>
            {
                isShow && (
                    <>
                        <Form.Item name="subtitle" className="mb-4">
                            <Input type="text" placeholder="副标题" value={subtitle}
                                   onInput={(e) => setSubtitle((e as any).target.value)}/>
                        </Form.Item>
                        <Form.Item name="cover">
                            图片上传
                        </Form.Item>
                        <Form.Item name="category">
                            <Select value={category} onChange={setCategory}>
                                <Select.Option value={1} title="前端">前端</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="tags">
                            <Select mode="tags" value={tags} onChange={setTags} tokenSeparators={[',']}>
                                <Select.Option value={1} title="前端">Vue</Select.Option>
                                <Select.Option value={2} title="前端">React</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="series">
                            <Select mode="tags" value={series} onChange={setSeries} tokenSeparators={[',']}>
                                <Select.Option value={1} title="前端">Vue</Select.Option>
                                <Select.Option value={2} title="前端">React</Select.Option>
                            </Select>
                        </Form.Item>
                    </>
                )}
        </Form>
    )
}
