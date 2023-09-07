import { PhotoService } from './../../../../core/services/photo/photo.service';
import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { PhotoListItem } from '../../../../core/models/photo.model';

@Component({
	selector: 'post-list-item',
	templateUrl: './post-list-item.component.html',
	styleUrls: ['./post-list-item.component.scss'],
	encapsulation: ViewEncapsulation.Emulated
})
export class PostListItemComponent {
	@Input({ required: true }) item!: PhotoListItem;

	@ViewChild('listItem', { static: true }) element!: ElementRef<HTMLDivElement>;

	thumbnail!: string;
	image!: string;

	constructor(private readonly photoService: PhotoService) {}

	isAppearing(value: boolean): void {
		if (!value) return;

		const { width, height } = this.element.nativeElement.getBoundingClientRect();

		const thumbWidth = Math.trunc(width / 3);
		const thumbHeight = Math.trunc((height * thumbWidth) / width);
		const mainWidth = Math.trunc(width);
		const mainHeight = Math.trunc((height * mainWidth) / width);

		if (!this.thumbnail) {
			const thumbnailUrl = `${this.item.pureUrl}/${thumbWidth}/${thumbHeight}?blur=3`;
			this.photoService.image(thumbnailUrl).subscribe(value => {
				this.thumbnail = value.data;
			});
		}

		if (!this.image) {
			const mainUrl = `${this.item.pureUrl}/${mainWidth}/${mainHeight}`;
			this.photoService.image(mainUrl).subscribe(value => {
				this.image = value.data;
			});
		}
	}

	// @typescript-eslint/disa
	isDisappearing(value: boolean): void {}
}
