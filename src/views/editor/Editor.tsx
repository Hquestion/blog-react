import React, {useEffect, useState} from "react";
import { FlagOutlined, ClearOutlined, DeliveredProcedureOutlined, CheckOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import MdEditor from "./MDEditor";
import './editor.scss';
import {Button, Input} from "antd";
import {throttle} from "../../utils";
import {createPost, createDraft, updatePost} from "../../api/post";
import {Post} from "../article/types";
import {uploadPastedImg} from "../../api/common";
import {relativeTimeFormatter} from "../../utils/formatter";

let doSaveDraft: Function;

function Editor() {
    const [code, setCode] = useState('');
    const [ title, setTitle ] = useState('');
    const [isDraftSaved, setIsDraftSaved] = useState(false);
    const [lastSaveTime, setLastSaveTime] = useState('');
    const [ draftId, setDraftId ] = useState('');
    const history = useHistory();
    const upload = (blob: Blob) => uploadPastedImg(blob) as Promise<string>;

    useEffect(() => {
        doSaveDraft = throttle((title: string, code: string) => {
            handleSaveDraft();
        }, 60 * 1000);
    }, [])

    const handleCancel = () => history.goBack();
    const handleCodeUpdate = (str: string) => {
        setCode(str);
        // 自动保存草稿
        doSaveDraft(title, str);
    }
    const handleSaveDraft = () => {
        if (draftId) {
            updatePost(draftId, {
                title,
                content: code
            }).promise.then((res) => {
                setIsDraftSaved(true);
                setLastSaveTime(dayjs().toISOString());
            });
        } else {
            createDraft({
                title,
                content: code
            }).promise.then((res) => {
                setDraftId((res as any).uuid);
                setIsDraftSaved(true);
                setLastSaveTime(dayjs().toISOString());
            });
        }
    }
    const handleSave = () => {
        // todo 保存正式文章
        if (draftId) {
            updatePost(draftId, {
                title,
                content: code,
                isPublished: '1',
            }).promise.then((res) => {
                history.push(`/post/publish/${draftId}`)
            });
        } else {
            createPost({
                title,
                content: code
            }).promise.then((res) => {
                history.push(`/post/publish/${(res as Partial<Post>).uuid}`)
            });
        }
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
            <div className="blog-editor__footer flex justify-between items-center px-4 py-4">
                <div className="left text-sm text-gray-600">
                    {isDraftSaved && <>草稿已保存 <CheckOutlined /> {relativeTimeFormatter(lastSaveTime)}</>}
                </div>
                <div className="flex justify-end items-center">
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
        </div>
    )
}

export default Editor;
