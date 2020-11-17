import React, {useEffect, useState} from "react";
import {Button} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {ITag} from "../article/types";
import {getTags} from "../../api/tag";
import './UserSeries.scss';
import UserTagModal from "./tag/UserTagModal";
import useIsCurrentUser from "../../utils/useIsCurrentUser";
import UserTagCard from "./tag/UserTagCard";

interface IUserTagsProp {
    userId: string | undefined
}

const UserTags = (props: IUserTagsProp) => {
    const [tags, setTags] = useState([]);
    const [visible, setVisible] = useState(false);
    const [ tagMeta, setTagMeta ]: [Partial<ITag>, Function] = useState({});
    const { userId } = props;
    const isCurrentUser = useIsCurrentUser(userId);

    useEffect(() => {
        if (userId) {
            initTags();
        }
    }, [userId]);

    const initTags = () => {
        if (!userId) return;
        getTags(userId).then(res => {
            setTags(res as any || []);
        })
    }

    const handleSaveTag = () => {
        initTags();
    }

    const handleDel = (index: number) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(() => newTags);
    }
    return (
        <div className="user-series">
            {
                isCurrentUser && (
                    <div className="user-series__header">
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => setVisible(true)}>创建标签</Button>
                    </div>
                )
            }

            <div className="user-series__main flex justify-start items-start flex-wrap">
                {
                    tags.map((item: Partial<ITag>, index: number) => {
                        return (
                            <UserTagCard
                                tag={item}
                                key={item.uuid}
                                onDeleteTag={() => handleDel(index)}
                            />
                        )
                    })
                }
            </div>
            <UserTagModal onSave={handleSaveTag} visible={visible} setVisible={setVisible} />
        </div>
    );
};

export default UserTags;
