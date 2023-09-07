import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, concatMap, fromEvent, map, of } from 'rxjs';
import { HttpService } from '../http/http.service';
import { ImageList, ImageListItem, PhotoList, PhotoListItem, PhotoListItemResponse } from '../../models/photo.model';

@Injectable({
	providedIn: 'root'
})
export class PhotoService {
	private url = 'https://picsum.photos/v2/list';
	private imageSub = new BehaviorSubject<ImageList>([]);

	constructor(private readonly httpService: HttpService) {}

	private setImage(image: ImageListItem) {
		this.imageSub.next([image, ...this.imageSub.value]);
	}

	private getImage(imageUrl: string): ImageListItem {
		return this.imageSub.value.find(image => image.imageUrl === imageUrl) as ImageListItem;
	}

	list(page = 1, size = 10): Observable<PhotoList> {
		let params = new HttpParams();
		params = params.append('page', page);
		params = params.append('limit', size);

		const options = { params };

		return this.httpService.get<PhotoListItemResponse[]>(this.url, options).pipe(
			map(items =>
				items.map(item => {
					const { id, download_url: downloadUrl, ...rest } = item;
					let index = downloadUrl.indexOf(String(id));
					index += id.length;
					const pureUrl = downloadUrl.substring(0, index);
					return {
						...rest,
						id: +id,
						downloadUrl,
						pureUrl
					} as PhotoListItem;
				})
			)
		);
	}

	image(imageUrl: string): Observable<ImageListItem> {
		const image = this.getImage(imageUrl);
		if (image) return of(image);

		return this.httpService.get<Blob>(imageUrl, { responseType: 'blob' }).pipe(
			concatMap((blob: Blob) => this.toBase64(blob)),
			map(data => {
				const image = { imageUrl, data } as ImageListItem;
				this.setImage(image);
				return image;
			})
		);
	}

	private toBase64(blob: Blob): Observable<string> {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		return fromEvent(reader, 'load').pipe(map(() => reader.result as string));
	}
}
