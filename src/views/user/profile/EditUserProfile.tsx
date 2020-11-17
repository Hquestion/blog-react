import React, {useState} from "react";
import {Form, Button, Input, Slider} from "antd";
import {IUser} from "../../article/types";

const EditUserProfile = () => {
    const [user, setUser]: [Partial<IUser>, Function] = useState({});
    return (
        <div className="edit-user-profile container mx-auto bg-white my-4 p-4">
            <Form className="">
                <Form.Item label="用户名">
                    <span>{user.name}</span>
                </Form.Item>
                <Form.Item label="公司">
                    <span>{user.name}</span>
                </Form.Item>
                <Form.Item label="地址">
                    <span>{user.name}</span>
                </Form.Item>
                <Form.Item label="技术栈">
                    <div className="">
                        <div><Input type="text" placeholder="请输入技能名称" /></div>
                        <div><Input.TextArea className={"resize-none"} placeholder="请简单描述你对该技能的掌握程度" /></div>
                        <div><Slider defaultValue={30} tooltipVisible /></div>
                    </div>
                    <Button type={"link"}>添加</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditUserProfile;
