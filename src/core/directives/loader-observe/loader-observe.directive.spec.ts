import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PostListLoadComponent } from '../../../features/post/list/load/post-list-load.component';
import { LoaderObserveDirective } from './loader-observe.directive';
import { DebugElement } from '@angular/core';

describe('LoaderObserveDirective', () => {
	let component: PostListLoadComponent;
	let fixture: ComponentFixture<PostListLoadComponent>;
	let inputEl: DebugElement;
	beforeEach(() => {
		fixture = TestBed.configureTestingModule({
			declarations: [PostListLoadComponent, LoaderObserveDirective]
		}).createComponent(PostListLoadComponent);
		component = fixture.componentInstance;
		inputEl = fixture.debugElement.query(By.css('.post-list-load'));
		fixture.detectChanges();
	});
	it('should create a component', () => {
		expect(component).toBeTruthy();
		expect(inputEl).toBeTruthy();
	});
});
