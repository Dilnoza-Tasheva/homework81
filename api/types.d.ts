export interface ILink {
    id: string;
    shortUrl: string;
    originalUrl: string;
}

export type ILinkWihtoutId = Omit<ILink, 'id'>