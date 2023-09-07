import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './main-routing.module';
import { LayoutComponent } from './features/layout.component';

@NgModule({
	declarations: [LayoutComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [LayoutComponent]
})
export class MainModule {}
