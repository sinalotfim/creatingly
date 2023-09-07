import { DestroyRef, Directive, ElementRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

interface IntersectionEntry {
	isAppearing: boolean;
	isDisappearing: boolean;
}

@Directive({
	selector: '[imageObserve]'
})
export class ImageObserveDirective implements OnInit {
	@Input({ required: false }) root?: null;
	@Input({ required: false }) margin?: '0px';
	@Input({ required: false }) threshold = 0.1;
	@Output() isAppearing = new EventEmitter<boolean>();
	@Output() isDisappearing = new EventEmitter<boolean>();

	private destroyer = inject(DestroyRef);

	constructor(private element: ElementRef) {}

	ngOnInit(): void {
		this.observe()
			.pipe(takeUntilDestroyed(this.destroyer))
			.subscribe((entry: IntersectionEntry) => {
				const { isAppearing, isDisappearing } = entry;
				this.isAppearing.emit(isAppearing);
				this.isDisappearing.emit(isDisappearing);
			});
	}

	private observe(): Observable<IntersectionEntry> {
		const options: IntersectionObserverInit = {
			root: this.root,
			rootMargin: '0px',
			threshold: this.threshold
		};

		return new Observable<IntersectionEntry>(subscriber => {
			const intersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
				const { isIntersecting, intersectionRatio } = entries[0];

				const entry = {
					isAppearing: isIntersecting && intersectionRatio > this.threshold,
					isDisappearing: !isIntersecting && intersectionRatio < this.threshold
				} as IntersectionEntry;
				subscriber.next(entry);
			}, options);

			intersectionObserver.observe(this.element.nativeElement);

			return {
				unsubscribe() {
					intersectionObserver.disconnect();
				}
			};
		});
	}
}
