export interface Post {
    uuid: string,
    title: string,
    subtitle: string,
    content: string,
    read?: number,
    fav?: number,
    star?: number,
    isPublished: boolean | string,
    createdAt: string,
    updatedAt: string,
    cover?: string,
    user?: IUser
}

export interface IUser {
    uuid: string,
    name: string,
    avatar?: string | undefined,
    nickname: string | undefined,
    createdAt: string,
    updatedAt: string,
    phone?: string,
    email?: string,
}

export interface IComment {
    uuid: string,
    content: string,
    post: string,
    user: string,
    comment: string,
    updatedAt: string,
    createdAt: string,
    isDelete: '0' | '1',
    userMeta: IUser,
    postMeta: Post,
    commentMeta: Partial<IComment>
}
