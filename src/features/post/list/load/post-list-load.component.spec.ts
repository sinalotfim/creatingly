import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderObserveDirective } from './../../../../core/directives/loader-observe/loader-observe.directive';
import { PostListLoadComponent } from './post-list-load.component';

describe('PostListLoadComponent', () => {
	let component: PostListLoadComponent;
	let fixture: ComponentFixture<PostListLoadComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PostListLoadComponent, LoaderObserveDirective]
		});
		fixture = TestBed.createComponent(PostListLoadComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create a component', () => {
		expect(component).toBeTruthy();
	});

	it('should emit the output', () => {
		jest.spyOn(component.loadMore, 'emit');
		expect(component.loadMore.emit).not.toHaveBeenCalled();

		component.loadMore.emit();
		expect(component.loadMore.emit).toHaveBeenCalled();
	});

	it('isVisible should be called', () => {
		jest.spyOn(component, 'isVisible');
		component.isVisible();
		expect(component.isVisible).toHaveBeenCalled();
	});
});
