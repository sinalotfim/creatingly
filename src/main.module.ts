import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './main-routing.module';
import { LayoutComponent } from './features/layout.component';
import { ImageObserveDirective } from './core/directives/image-observe/image-observe.directive';
import { LoaderObserveDirective } from './core/directives/loader-observe/loader-observe.directive';
import { HttpService } from './core/services/http/http.service';
import { PhotoService } from './core/services/photo/photo.service';
import { GlobalErrorHandler } from './core/handlers/global-error.handler';
import { GlobalHttpInterceptor } from './core/interceptors/global-http/global-http.interceptor';

@NgModule({
	declarations: [LayoutComponent, ImageObserveDirective, LoaderObserveDirective],
	imports: [BrowserModule, AppRoutingModule],
	providers: [
		HttpService,
		PhotoService,
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: GlobalHttpInterceptor,
			multi: true
		}
	],
	bootstrap: [LayoutComponent]
})
export class MainModule {}
