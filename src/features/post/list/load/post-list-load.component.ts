import { Component, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'post-list-load',
	templateUrl: './post-list-load.component.html',
	styleUrls: ['./post-list-load.component.scss']
})
export class PostListLoadComponent {
	@Output() loadMore = new EventEmitter<void>();

	isVisible(): void {
		this.loadMore.emit();
	}
}
