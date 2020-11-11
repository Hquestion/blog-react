import React from "react";
import {Post} from "./types";
import UserCommentInput from "./UserCommentInput";

interface ICommentProps {
    post: Partial<Post>
}

export default function BlogComment(props: ICommentProps) {
    return (
        <div className="mt-6">
            <UserCommentInput />
        </div>
    );
}
