export interface PhotoListItemResponse {
	id: string;
	author: string;
	width: number;
	height: number;
	url: string;
	download_url: string;
}

export interface PhotoListItem {
	id: number;
	author: string;
	width: number;
	height: number;
	url: string;
	pureUrl: string;
	downloadUrl: string;
}

export type PhotoList = PhotoListItem[];

export interface ImageListItem {
	imageUrl: string;
	data: string;
}

export type ImageList = ImageListItem[];
