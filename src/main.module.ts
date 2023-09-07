import { ErrorHandler, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './features/layout.component';
import { ImageObserveDirective } from './core/directives/image-observe/image-observe.directive';
import { LoaderObserveDirective } from './core/directives/loader-observe/loader-observe.directive';
import { HttpService } from './core/services/http/http.service';
import { PhotoService } from './core/services/photo/photo.service';
import { GlobalErrorHandler } from './core/handlers/global-error.handler';
import { GlobalHttpInterceptor } from './core/interceptors/global-http/global-http.interceptor';
import { PostComponent } from './features/post/post.component';
import { PostListComponent } from './features/post/list/post-list.component';
import { PostListItemComponent } from './features/post/list/item/post-list-item.component';
import { PostListLoadComponent } from './features/post/list/load/post-list-load.component';

@NgModule({
	declarations: [
		LayoutComponent,
		PostComponent,
		PostListComponent,
		PostListItemComponent,
		PostListLoadComponent,
		ImageObserveDirective,
		LoaderObserveDirective
	],
	imports: [BrowserModule, HttpClientModule, MainRoutingModule],
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
