export interface ItemData {
    title: any; 
    user: any; 
    body: any;
    similarity: any;
}

export interface PostData {
    id: string | number | null | undefined;
    userId: any;
    title: any;
    body: any;
    similarity: any;
}

export interface TitleData {
    title: string;
    body: string;
    similarity: number;
}