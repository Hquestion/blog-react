import React, {useEffect, useState} from 'react';
import { getPostCommentsByPage } from '../../api/post';
import UserCommentItem from "./UserCommentItem";
import UserCommentInput from "./UserCommentInput";

interface IUserCommentsProp {
    postId: string
}

const pageSize = 10;

const UserComments = (props: IUserCommentsProp) => {
    const {postId} = props;
    const [comments, setComments]: [any[], any] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    useEffect(() => {
        if (postId) {
            loadPostComments();
        }
    }, [postId]);

    const loadPostComments = () => {
        getPostCommentsByPage(postId, currentPage, pageSize).promise.then((data) => {
            setComments(data);
        });
    }

    return (
        <>
            <UserCommentInput postId={postId} onCommentSuccess={loadPostComments} />
            <div className="user-comments-wrapper p-4">
                {
                    comments.map((comment, index) => {
                        return (
                            <UserCommentItem
                                key={comment.uuid}
                                comment={comment}
                                onCommentSuccess={loadPostComments}
                            />
                        )
                    })
                }
            </div>
        </>
    );
}

export default UserComments;
