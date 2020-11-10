import React, {useState} from "react";
import { FlagOutlined, ClearOutlined, DeliveredProcedureOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import MdEditor from "./MDEditor";
import './editor.scss';
import {Button, Input} from "antd";
import {throttle} from "../../utils";
import { createPost, createDraft } from "../../api/post";
import {Post} from "../article/types";

const doSaveDraft = throttle((title: string, code: string) => {
    console.log(title, code);
}, 3000);

function Editor() {
    const [code, setCode] = useState('');
    const [ title, setTitle ] = useState('');
    const history = useHistory();
    console.log(useParams())
    const upload = (blob: Blob) => Promise.resolve('xx');

    const handleCancel = () => history.goBack();
    const handleCodeUpdate = (str: string) => {
        setCode(str);
        // 自动保存草稿
        doSaveDraft(title, str);
    }
    const handleSaveDraft = () => {
        // todo 保存草稿
        createDraft({
            title,
            content: code
        })
    }
    const handleSave = () => {
        // todo 保存正式文章
        createPost({
            title,
            content: code
        }).promise.then((res) => {
            history.push(`/post/publish/${(res as Partial<Post>).uuid}`)
        });
    }
    return (
        <div className="blog-editor-wrapper w-full">
            <div className="blog-editor-header py-2">
                <Input placeholder="请输入标题" value={title}
                       className="text-2xl bg-transparent title-input"
                    onInput={(e: any) => setTitle(e.target.value)}/>
            </div>
            <div className="blog-editor__main">
                <MdEditor code={code} updateCode={handleCodeUpdate} upload={upload} />
            </div>
            <div className="blog-editor__footer flex justify-end items-center px-4 py-4">
                <Button type="primary" danger={true} size="middle" className="ml-4" icon={<ClearOutlined />} onClick={handleCancel}>放弃</Button>
                <Button type="default" size="middle" className="ml-4" icon={<FlagOutlined />} onClick={handleSaveDraft}>仅保存为草稿</Button>
                <Button
                    type="primary"
                    size="middle"
                    className="ml-4"
                    icon={<DeliveredProcedureOutlined />}
                    onClick={handleSave}
                >发布</Button>
            </div>
        </div>
    )
}

export default Editor;
