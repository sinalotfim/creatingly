import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { PostComponent } from './post/post.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LayoutComponent', () => {
	let component: PostComponent;
	let fixture: ComponentFixture<PostComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LayoutComponent, PostComponent],
			schemas: [NO_ERRORS_SCHEMA]
		});
		fixture = TestBed.createComponent(LayoutComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});
});
