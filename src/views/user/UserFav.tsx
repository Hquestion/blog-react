import React, {useEffect, useState} from "react";
import {Button} from "antd";
import UserFavFolderCard from "./fav/UserFavFolderCard";
import UserFavFolderModal from "./fav/UserFavFolderModal";
import {getFavFolders} from "../../api/favFolder";
import {IFavFolders} from "../article/types";
import './UserFav.scss';
import useIsCurrentUser from "../../utils/useIsCurrentUser";

interface IUserFavProp {
    userId: string | undefined
}

const UserFav = (props: IUserFavProp) => {
    const { userId } = props;
    const [userFavFolders, setUserFavFolders] = useState([]);
    const [visible, setVisible] = useState(false);
    const isCurrentUser = useIsCurrentUser(userId);

    useEffect(() => {
        initFavFolders();
    }, [userId]);

    const initFavFolders = () => {
        if (!userId) {
            setUserFavFolders([]);
            return;
        }
        getFavFolders(userId).then((res) => {
            setUserFavFolders(res as any || []);
        });
    }

    const handleSaveFavFolder = () => {
        initFavFolders();
    }

    const handleDelFavFolder = (index: number) => {
        const newFolders = [...userFavFolders];
        newFolders.splice(index, 1);
        setUserFavFolders(() => newFolders);
    }

    return (
        <div className="user-fav">
            {
                isCurrentUser && (
                    <div className="user-fav__header">
                        <Button type="primary" onClick={() => setVisible(true)}>创建收藏夹</Button>
                    </div>
                )
            }
            <div className="user-fav__main flex justify-start items-start flex-wrap">
                {
                    userFavFolders.map((folder, index) => (
                        <UserFavFolderCard
                            favFolder={folder}
                            key={(folder as IFavFolders ).uuid}
                            onDeleteFavFolder={() => handleDelFavFolder(index)}
                        />))
                }
            </div>
            <UserFavFolderModal onSave={handleSaveFavFolder} visible={visible} setVisible={setVisible} />
        </div>
    );
}

export default UserFav;
