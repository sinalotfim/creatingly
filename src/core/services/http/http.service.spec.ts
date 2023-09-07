import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { HttpService } from './http.service';

const url = 'https://www.sinalotfi.com';
const mockSuccess = [
	{
		id: '10',
		author: 'Paul Jarvis',
		width: 2500,
		height: 1667,
		url: 'https://unsplash.com/photos/6J--NXulQCs',
		download_url: 'https://picsum.photos/id/10/2500/1667'
	}
];
const mockError = new HttpErrorResponse({
	status: 404,
	statusText: 'Not Found',
	error: 'Something wrong happened'
});

describe('HttpService', () => {
	let service: HttpService;
	let httpClientMock: any;

	beforeEach(() => {
		httpClientMock = {
			get: jest.fn(),
			post: jest.fn(),
			put: jest.fn(),
			delete: jest.fn()
		};

		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [
				{
					provide: HttpClient,
					useValue: httpClientMock
				}
			]
		});
		service = TestBed.inject(HttpService);
	});

	it('service should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('get', () => {
		it(`'get' should be called`, () => {
			jest.spyOn(httpClientMock, 'get').mockReturnValue(of(mockSuccess));
			service.get(url).subscribe();
			expect(httpClientMock.get).toHaveBeenCalled();
			expect(httpClientMock.get).toHaveBeenCalledTimes(1);
			expect(httpClientMock.get).toHaveBeenCalledWith(url, undefined);
		});

		it(`'get' should be received success response`, done => {
			jest.spyOn(httpClientMock, 'get').mockReturnValue(of(mockSuccess));
			service.get(url).subscribe({
				next: value => {
					expect(value).toEqual(mockSuccess);
					done();
				}
			});
		});

		it(`'get' should be received error response`, done => {
			jest.spyOn(httpClientMock, 'get').mockReturnValue(throwError(() => mockError));
			service.get(url).subscribe({
				error: value => {
					expect(value).toEqual(mockError.error);
					done();
				}
			});
		});
	});

	describe('post', () => {
		it(`'post' should be called`, () => {
			const value = mockSuccess[0];
			jest.spyOn(httpClientMock, 'post').mockReturnValue(of(value));
			service.post(url, value).subscribe();
			expect(httpClientMock.post).toHaveBeenCalled();
			expect(httpClientMock.post).toHaveBeenCalledTimes(1);
			expect(httpClientMock.post).toHaveBeenCalledWith(url, value, undefined);
		});

		it(`'post' should be received success response`, done => {
			jest.spyOn(httpClientMock, 'post').mockReturnValue(of(mockSuccess[0]));
			service.post(url, mockSuccess).subscribe({
				next: value => {
					expect(value).toEqual(mockSuccess[0]);
					done();
				}
			});
		});

		it(`'post' should be received error response`, done => {
			jest.spyOn(httpClientMock, 'post').mockReturnValue(throwError(() => mockError));
			service.post(url, mockSuccess).subscribe({
				error: value => {
					expect(value).toEqual(mockError.error);
					done();
				}
			});
		});
	});

	describe('put', () => {
		it(`'put' should be called`, () => {
			const value = mockSuccess[0];
			jest.spyOn(httpClientMock, 'put').mockReturnValue(of(value));
			service.put(url, value).subscribe();
			expect(httpClientMock.put).toHaveBeenCalled();
			expect(httpClientMock.put).toHaveBeenCalledTimes(1);
			expect(httpClientMock.put).toHaveBeenCalledWith(url, value, undefined);
		});

		it(`'put' should be received success response`, done => {
			jest.spyOn(httpClientMock, 'put').mockReturnValue(of(mockSuccess[0]));
			service.put(url, mockSuccess).subscribe({
				next: value => {
					expect(value).toEqual(mockSuccess[0]);
					done();
				}
			});
		});

		it(`'put' should be received error response`, done => {
			jest.spyOn(httpClientMock, 'put').mockReturnValue(throwError(() => mockError));
			service.put(url, mockSuccess).subscribe({
				error: value => {
					expect(value).toEqual(mockError.error);
					done();
				}
			});
		});
	});

	describe('delete', () => {
		it(`'delete' should be called`, () => {
			const value = mockSuccess[0].id;
			jest.spyOn(httpClientMock, 'delete').mockReturnValue(of(value));
			service.delete(url).subscribe();
			expect(httpClientMock.delete).toHaveBeenCalled();
			expect(httpClientMock.delete).toHaveBeenCalledTimes(1);
			expect(httpClientMock.delete).toHaveBeenCalledWith(url, undefined);
		});

		it(`'delete' should be received success response`, done => {
			const value = mockSuccess[0].id;
			jest.spyOn(httpClientMock, 'delete').mockReturnValue(of(value));
			service.delete(url).subscribe({
				next: value => {
					expect(value).toEqual(value);
					done();
				}
			});
		});

		it(`'delete' should be received error response`, done => {
			jest.spyOn(httpClientMock, 'delete').mockReturnValue(throwError(() => mockError));
			service.delete(url).subscribe({
				error: value => {
					expect(value).toEqual(mockError.error);
					done();
				}
			});
		});
	});
});
