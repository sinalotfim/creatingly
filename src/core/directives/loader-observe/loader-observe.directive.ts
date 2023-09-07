import { DestroyRef, Directive, ElementRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

@Directive({
	selector: '[loaderObserve]'
})
export class LoaderObserveDirective implements OnInit {
	@Input({ required: false }) root? = null;
	@Input({ required: false }) margin? = '0px';
	@Input({ required: false }) threshold = 0.1;
	@Output() isVisible = new EventEmitter<void>();

	private destroyer = inject(DestroyRef);

	constructor(private element: ElementRef) {}

	ngOnInit(): void {
		this.observe()
			.pipe(takeUntilDestroyed(this.destroyer))
			.subscribe(() => {
				this.isVisible.emit();
			});
	}

	private observe(): Observable<void> {
		const options: IntersectionObserverInit = {
			root: this.root,
			rootMargin: '0px',
			threshold: this.threshold
		};

		return new Observable<void>(subscriber => {
			const intersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
				const { isIntersecting, intersectionRatio } = entries[0];
				if (isIntersecting && intersectionRatio > this.threshold) subscriber.next();
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
