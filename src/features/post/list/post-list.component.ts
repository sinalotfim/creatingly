import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PhotoList } from '../../../core/models/photo.model';
import { PhotoService } from '../../../core/services/photo/photo.service';

@Component({
	selector: 'post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss'],
	encapsulation: ViewEncapsulation.Emulated
})
export class PostListComponent implements OnInit {
	items: PhotoList = [];
	pageNumber = 1;
	pageSize = 10;
	showLoader = false;

	constructor(private readonly photoService: PhotoService) {}

	ngOnInit(): void {
		this.load();
	}

	handleLoadMore() {
		this.pageNumber++;
		this.load();
	}

	private load(): void {
		this.photoService.list(this.pageNumber, this.pageSize).subscribe(value => {
			this.items.push(...value);
			this.changeLoader();
		});
	}

	private changeLoader(): void {
		setTimeout(() => (this.showLoader = true), 1000);
	}
}
