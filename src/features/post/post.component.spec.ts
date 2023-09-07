import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
	let component: PostComponent;
	let fixture: ComponentFixture<PostComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [PostComponent],
			schemas: [NO_ERRORS_SCHEMA]
		});
		fixture = TestBed.createComponent(PostComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
