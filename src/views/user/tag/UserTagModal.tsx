import React, {useCallback, useEffect, useState} from "react";
import {IFavFolders} from "../../article/types";
import {Form, Input, Modal} from "antd";
import BlogUpload from "../../../components/BlogUpload";
import {createTag} from "../../../api/tag";

interface IUserTagModalProp {
    tag?: Partial<IFavFolders>,
    onSave: Function,
    visible: boolean,
    setVisible: (isVisible: boolean) => void
}

export default function UserTagModal(props: IUserTagModalProp) {
    const { visible, setVisible, tag, onSave } = props;
    const [data, setData]: [Partial<IFavFolders>, Function] = useState({});
    const isEdit = useCallback(() => !!tag && !!tag.uuid, [tag]);
    useEffect(() => {
        if (isEdit()) {
            setData({...tag});
        }
    }, [tag, isEdit]);


    const handleCreateTag = () => {
        if (isEdit()) {
            // 更新操作
        } else {
            // 创建操作
            createTag(data).then((res) => {
                setVisible(false);
                onSave(res);
            });
        }
    }

    const handleUpload = (url: string) => {
        setData({...data, logo: url });
    }

    return (
        <Modal
            title={isEdit() ? '修改标签' : '创建标签'}
            visible={visible}
            onOk={handleCreateTag}
            onCancel={() => setVisible(false)}
            okText={'提交'}
            cancelText={'取消'}
        >
            <Form size="large">
                <Form.Item>
                    <BlogUpload sourceImg={data.logo} onUpload={handleUpload} />
                </Form.Item>
                <Form.Item className="mb-4">
                    <Input type="text" placeholder="输入标题" value={data.title}
                           onInput={(e) => setData({...data, title: (e as any).target.value })}/>
                </Form.Item>
                <Form.Item className="mb-4">
                    <Input type="text" placeholder="输入描述" value={data.description}
                           onInput={(e) => setData({...data, description: (e as any).target.value })}/>
                </Form.Item>
            </Form>
        </Modal>
    )
}
