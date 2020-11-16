import React, {useState} from "react";
import {IFavFolders} from "../../article/types";
import {Avatar, Popconfirm} from "antd";
import {DeleteOutlined, EditOutlined, FileOutlined, FolderOutlined} from "@ant-design/icons";
import {relativeTimeFormatter} from "../../../utils/formatter";
import {useHistory} from "react-router-dom";
import {deleteFavFolder} from "../../../api/favFolder";
import './UserFavFolderCard.scss';

interface IFavFolderCardProp {
    favFolder: Partial<IFavFolders>
    onDeleteFavFolder: Function
}

const UserFavFolderCard = (props: IFavFolderCardProp) => {
    const { favFolder } = props;
    const [delPopVisible, setDelPopVisible] = useState(false);
    const history = useHistory();
    const delSeries = () => {
        setDelPopVisible(false);
        if (favFolder.uuid) {
            deleteFavFolder(favFolder.uuid).then(() => {
                props.onDeleteFavFolder();
            });
        }
    };
    const handleFavFolderClick = () => {
        // 跳转系列详情
        history.push(`/fav-folder/${favFolder.uuid}/favs`);
    };
    return (
        <div className="user-fav-folder-card">
            <div className="user-fav-folder-card__main cursor-pointer" onClick={handleFavFolderClick}>
                <Avatar className="logo mx-auto" size="large" icon={<FolderOutlined />} src={favFolder.logo} />
                <div className="font-bold text-base my-1">{favFolder.title}</div>
                <div className="text-sm text-gray-600">{favFolder.description || '暂无描述~~'}</div>
                <div className="create-time text-sm text-gray-600">{relativeTimeFormatter(favFolder.createdAt || '')}</div>
                <div className="series-post text-sm text-blue-600">
                    <FileOutlined className="mr-2" />
                    {`共有 ${favFolder.favList && favFolder.favList.length} 个收藏`}
                </div>
            </div>
            <div className='user-fav-folder-card__footer flex justify-between px-8 py-3 items-center border-t'>
                <EditOutlined />
                <Popconfirm
                    title="确认删除该收藏夹吗？"
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

export default UserFavFolderCard;
