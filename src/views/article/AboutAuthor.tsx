import React from "react";
import {IUser} from "./types";
import Author from "./Author";

interface IPostAuthor {
    user: Partial<IUser>,
    style?: any,
    className?: any
}

const AboutAuthor: React.FC<IPostAuthor> = (props) => {
    const { user } = props;
    return (
        <div className="about-author bg-white">
            <div className="about-author__header py-2 px-4 border-b">
                关于作者
            </div>
            <div className="p-4">
                <Author user={user} noPadding={true} />
            </div>
        </div>
    );
}

export default AboutAuthor;
