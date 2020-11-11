export interface Post {
    uuid: string,
    title: string,
    subtitle: string,
    content: string,
    read?: number,
    fav?: number,
    star?: number,
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
