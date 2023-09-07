import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { PhotoService } from '../../../core/services/photo/photo.service';
import { PostListComponent } from './post-list.component';
import { PostListItemComponent } from './item/post-list-item.component';
import { PostListLoadComponent } from './load/post-list-load.component';

const mockResponse = [
	{
		author: 'Alejandro Escamilla',
		downloadUrl: 'https://picsum.photos/id/0/5000/3333',
		height: 3333,
		id: 0,
		pureUrl: 'https://picsum.photos/id/0',
		url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
		width: 5000
	}
];

describe('PostListComponent', () => {
	let component: PostListComponent;
	let fixture: ComponentFixture<PostListComponent>;
	let photoServiceMock: any;

	beforeEach(() => {
		photoServiceMock = {
			list() {
				return of(mockResponse);
			}
		};

		TestBed.configureTestingModule({
			providers: [
				{
					provide: PhotoService,
					useValue: photoServiceMock
				}
			],
			declarations: [PostListComponent, PostListItemComponent, PostListLoadComponent],
			schemas: [NO_ERRORS_SCHEMA]
		});
		fixture = TestBed.createComponent(PostListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create a component', () => {
		expect(component).toBeTruthy();
	});

	it('clarify all items in the component', () => {
		expect(component.items).toEqual(mockResponse);
		expect(component.pageNumber).toEqual(1);
		expect(component.pageSize).toEqual(10);
	});

	it('clarify showLoader in the component', done => {
		setTimeout(() => {
			expect(component.showLoader).toEqual(true);
			done();
		}, 1000);
	});

	it('handleLoadMore should be called', () => {
		jest.spyOn(component, 'handleLoadMore');
		component.handleLoadMore();
		expect(component.handleLoadMore).toHaveBeenCalled();
		expect(component.handleLoadMore).toHaveBeenCalledTimes(1);
	});

	it('clarify all items after calling handleLoadMore in the component', () => {
		jest.spyOn(component, 'handleLoadMore');
		component.handleLoadMore();
		component.handleLoadMore();
		expect(component.handleLoadMore).toHaveBeenCalled();
		expect(component.handleLoadMore).toHaveBeenCalledTimes(2);
		expect(component.items.length).toEqual(3);
		expect(component.pageNumber).toEqual(3);
		expect(component.pageSize).toEqual(10);
	});
});
