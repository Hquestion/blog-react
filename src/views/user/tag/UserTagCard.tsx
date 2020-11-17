import React, {useState} from "react";
import {ITag} from "../../article/types";
import {Avatar, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined, FileOutlined, TagOutlined} from "@ant-design/icons";
import {relativeTimeFormatter} from "../../../utils/formatter";
import {useHistory} from "react-router-dom";
import {deleteTag} from "../../../api/tag";

interface ITagCardProp {
    tag: Partial<ITag>
    onDeleteTag: Function
}

const UserTagCard = (props: ITagCardProp) => {
    const { tag, onDeleteTag } = props;
    const [delPopVisible, setDelPopVisible] = useState(false);
    const history = useHistory();
    const delSeries = () => {
        setDelPopVisible(false);
        if (tag.uuid) {
            deleteTag(tag.uuid).then(() => {
                onDeleteTag();
            });
        }
    };
    const handleTagClick = () => {
        // 跳转系列详情
        history.push(`/tag/${tag.uuid}/posts`);
    };
    return (
        <div className="user-fav-folder-card">
            <div className="user-fav-folder-card__main cursor-pointer" onClick={handleTagClick}>
                <Avatar className="logo mx-auto" size="large" icon={<TagOutlined />} src={tag.logo} />
                <div className="font-bold text-base my-1">{tag.title}</div>
                <div className="text-sm text-gray-600">{tag.description || '暂无描述~~'}</div>
                <div className="create-time text-sm text-gray-600">{relativeTimeFormatter(tag.createdAt || '')}</div>
                <div className="series-post text-sm text-blue-600">
                    <FileOutlined className="mr-2" />
                    {`共有 ${tag.postTags && tag.postTags.length} 篇相关文章`}
                </div>
            </div>
            <div className='user-fav-folder-card__footer flex justify-between px-8 py-3 items-center border-t'>
                <EditOutlined />
                <Popconfirm
                    title="确认删除该标签吗？"
                    visible={delPopVisible}
                    onConfirm={delSeries}
                    onCancel={() => setDelPopVisible(false)}
                    okText="确认"
                    cancelText="取消"
                >
                    <DeleteOutlined onClick={() => setDelPopVisible(true)} />
                </Popconfirm>
            </div>
        </div>
    )
}

export default UserTagCard;
