import React from "react";
import {Post} from "./types";
import UserComments from "./UserComments";

interface ICommentProps {
    postId: string,
    post: Partial<Post>
}

export default function BlogComment(props: ICommentProps) {
    const { postId } = props;
    return (
        <div className="mt-6">
            <UserComments postId={postId} />
        </div>
    );
}
