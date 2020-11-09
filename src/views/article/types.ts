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
    cover?: string
}
