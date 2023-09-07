import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PhotoListItem } from './../../models/photo.model';
import { PhotoService } from '../../../core/services/photo/photo.service';
import { PostListItemComponent } from '../../../features/post/list/item/post-list-item.component';
import { ImageObserveDirective } from './image-observe.directive';
import { DebugElement } from '@angular/core';

const itemInput = {
	author: 'Alejandro Escamilla',
	downloadUrl: 'https://picsum.photos/id/0/5000/3333',
	height: 3333,
	id: 0,
	pureUrl: 'https://picsum.photos/id/0',
	url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
	width: 5000
} as PhotoListItem;

describe('LoaderObserveDirective', () => {
	const photoServiceMock = { image: jest.fn() };
	let component: PostListItemComponent;
	let fixture: ComponentFixture<PostListItemComponent>;
	let inputEl: DebugElement;
	beforeEach(() => {
		fixture = TestBed.configureTestingModule({
			providers: [
				{
					provide: PhotoService,
					useValue: photoServiceMock
				}
			],
			declarations: [PostListItemComponent, ImageObserveDirective]
		}).createComponent(PostListItemComponent);
		component = fixture.componentInstance;
		component.item = itemInput;
		inputEl = fixture.debugElement.query(By.css('.post-list-item'));
		fixture.detectChanges();
	});
	it('should create a component', () => {
		expect(component).toBeTruthy();
		expect(inputEl).toBeTruthy();
	});
});
