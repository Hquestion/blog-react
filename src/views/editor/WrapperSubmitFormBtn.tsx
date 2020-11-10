import React, {useRef, useState} from 'react';
import {Button, Popover} from "antd";
import {DeliveredProcedureOutlined} from "@ant-design/icons";
import PostMetaForm from "./PostMetaForm";

export default function WrapperSubmitFormBtn() {
    function WrapperForm() {
        return (
            <div className="wrapper-form">
                <PostMetaForm />
                <div className="flex justify-end">
                    <Button type={"primary"} size={"small"} onClick={handlePublish}>发布</Button>
                </div>
            </div>
        );
    }

    const handlePublish = () => {

    }

    return (
        <Popover content={WrapperForm} trigger="click" title="请补充其他信息">
            <Button type="primary"
                    size="middle"
                    className="ml-4"
                    icon={<DeliveredProcedureOutlined />}
            >保存</Button>
        </Popover>
    );
}
