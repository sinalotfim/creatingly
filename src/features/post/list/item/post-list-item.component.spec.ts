import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PostListItemComponent } from './post-list-item.component';
import { ImageListItem, PhotoListItem } from './../../../../core/models/photo.model';
import { PhotoService } from '../../../../core/services/photo/photo.service';
import { ImageObserveDirective } from '../../../../core/directives/image-observe/image-observe.directive';

const itemInput = {
	author: 'Alejandro Escamilla',
	downloadUrl: 'https://picsum.photos/id/0/5000/3333',
	height: 3333,
	id: 0,
	pureUrl: 'https://picsum.photos/id/0',
	url: 'https://unsplash.com/photos/yC-Yzbqy7PY',
	width: 5000
} as PhotoListItem;
const mockResponse = {
	data: 'data:image/jpeg;base64,/9j/4QDcRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAV',
	imageUrl: 'https://picsum.photos/id/1/151/132?blur=3'
} as ImageListItem;

describe('PostListItemComponent', () => {
	let component: PostListItemComponent;
	let fixture: ComponentFixture<PostListItemComponent>;
	let photoServiceMock: any;

	beforeEach(() => {
		photoServiceMock = { image: jest.fn() };

		TestBed.configureTestingModule({
			providers: [
				{
					provide: PhotoService,
					useValue: photoServiceMock
				}
			],
			declarations: [PostListItemComponent, ImageObserveDirective]
		});
		fixture = TestBed.createComponent(PostListItemComponent);
		component = fixture.componentInstance;
		component.item = itemInput;
		component.element = fixture.debugElement.query(By.css('.post-list-item'));
		fixture.detectChanges();
	});

	it('should create a component', () => {
		expect(component).toBeTruthy();
	});

	it('isAppearing should be called with false value', () => {
		jest.spyOn(component, 'isAppearing');
		component.isAppearing(false);
		expect(component.isAppearing).toHaveBeenCalled();
		expect(component.isAppearing).toHaveBeenCalledTimes(1);
	});

	it('isAppearing should be called with true value', () => {
		jest.spyOn(photoServiceMock, 'image').mockReturnValue(of(mockResponse));
		jest.spyOn(component, 'isAppearing');
		component.isAppearing(true);
		expect(component.isAppearing).toHaveBeenCalled();
		expect(component.isAppearing).toHaveBeenCalledTimes(1);
	});

	it('isAppearing should be set thumbnail and image values', () => {
		jest.spyOn(photoServiceMock, 'image').mockReturnValue(of(mockResponse));
		jest.spyOn(component, 'isAppearing');
		component.isAppearing(true);
		expect(component.image).not.toBeFalsy();
		expect(component.image).toEqual(mockResponse.data);
		expect(component.thumbnail).not.toBeFalsy();
		expect(component.thumbnail).toEqual(mockResponse.data);
	});

	it('isAppearing should call photoService.image', () => {
		jest.spyOn(photoServiceMock, 'image').mockReturnValue(of(mockResponse));
		jest.spyOn(component, 'isAppearing');
		component.isAppearing(true);
		component.isAppearing(true);
		expect(photoServiceMock.image).toHaveBeenCalledTimes(2);
	});

	it('isDisappearing should be called', () => {
		jest.spyOn(component, 'isDisappearing');
		component.isDisappearing(false);
		component.isDisappearing(true);
		expect(component.isDisappearing).toHaveBeenCalled();
		expect(component.isDisappearing).toHaveBeenCalledTimes(2);
	});
});
