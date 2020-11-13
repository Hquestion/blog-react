import React from "react";

interface IUserPostProp {
    userId: string | undefined
}

const UserPost = (props: IUserPostProp) => {
    return (
        <div>User posts</div>
    );
}

export default UserPost;
