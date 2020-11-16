export type statusFlag = '0' | '1';

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
    company?: string,
    location? :string,
    techStacks: Array<any>
}

export interface IComment {
    uuid: string,
    content: string,
    post: string,
    user: string,
    comment: string,
    updatedAt: string,
    createdAt: string,
    isDelete: statusFlag,
    userMeta: IUser,
    postMeta: Post,
    commentMeta: Partial<IComment>
}

export interface ISeries {
    uuid: string,
    title: string,
    postList: Array<{uuid: string, title: string}>,
    description: string,
    logo: string,
    user: string,
    userMeta: IUser,
    isDelete: statusFlag,
    updatedAt: string,
    createdAt: string
}

export interface IFavFolders {
    uuid: string,
    title: string,
    favList: Array<{uuid: string, title: string}>,
    description: string,
    logo: string,
    user: string,
    userMeta: IUser,
    isDelete: statusFlag,
    updatedAt: string,
    createdAt: string
}
