import React, {useCallback, useEffect, useState} from "react";
import {IFavFolders} from "../../article/types";
import {Form, Input, Modal} from "antd";
import BlogUpload from "../../../components/BlogUpload";
import {createFavFolder} from "../../../api/favFolder";

interface IUserFavFolderModalProp {
    favFolder?: Partial<IFavFolders>,
    onSave: Function,
    visible: boolean,
    setVisible: (isVisible: boolean) => void
}

export default function UserFavFolderModal(props: IUserFavFolderModalProp) {
    const { visible, setVisible, favFolder, onSave } = props;
    const [data, setData]: [Partial<IFavFolders>, Function] = useState({});
    const isEdit = useCallback(() => !!favFolder && !!favFolder.uuid, [favFolder]);
    useEffect(() => {
        if (isEdit()) {
            setData({...favFolder});
        }
    }, [favFolder, isEdit]);


    const handleCreateFavFolder = () => {
        if (isEdit()) {
            // 更新操作
        } else {
            // 创建操作
            createFavFolder(data).then((res) => {
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
            title={isEdit() ? '修改收藏夹' : '创建收藏夹'}
            visible={visible}
            onOk={handleCreateFavFolder}
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
