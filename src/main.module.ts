import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './main-routing.module';
import { LayoutComponent } from './features/layout.component';
import { ImageObserveDirective } from './core/directives/image-observe/image-observe.directive';
import { LoaderObserveDirective } from './core/directives/loader-observe/loader-observe.directive';

@NgModule({
	declarations: [LayoutComponent, ImageObserveDirective, LoaderObserveDirective],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [LayoutComponent]
})
export class MainModule {}
