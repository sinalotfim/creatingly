import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PhotoService } from './photo.service';
import { HttpService } from '../http/http.service';

const mockUrlSuccess = [
	{
		id: '10',
		author: 'Paul Jarvis',
		width: 2500,
		height: 1667,
		url: 'https://unsplash.com/photos/6J--NXulQCs',
		download_url: 'https://picsum.photos/id/10/2500/1667'
	}
];

const mockDataSuccess = [
	{
		id: 10,
		author: 'Paul Jarvis',
		width: 2500,
		height: 1667,
		url: 'https://unsplash.com/photos/6J--NXulQCs',
		downloadUrl: 'https://picsum.photos/id/10/2500/1667',
		pureUrl: 'https://picsum.photos/id/10'
	}
];

describe('PhotoService', () => {
	let service: PhotoService;
	let httpServiceMock: any;

	beforeEach(() => {
		httpServiceMock = { get: jest.fn() };

		TestBed.configureTestingModule({
			providers: [
				{
					provide: HttpService,
					useValue: httpServiceMock
				}
			]
		});
		service = TestBed.inject(PhotoService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('list', () => {
		it(`'list' should be called`, () => {
			jest.spyOn(httpServiceMock, 'get').mockReturnValue(of(mockUrlSuccess));
			service.list(20, 30).subscribe();
			expect(httpServiceMock.get).toHaveBeenCalled();
			expect(httpServiceMock.get).toHaveBeenCalledTimes(1);
		});

		it(`'list' should be received success response`, done => {
			jest.spyOn(httpServiceMock, 'get').mockReturnValue(of(mockUrlSuccess));
			service.list().subscribe({
				next: value => {
					expect(value).toEqual(mockDataSuccess);
					done();
				}
			});
		});
	});
});
