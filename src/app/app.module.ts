import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FileElementComponent } from './components/file-element/file-element.component';
import { DirElementComponent } from './components/dir-element/dir-element.component';

@NgModule({
  declarations: [
    AppComponent,
    FileListComponent,
    SidebarComponent,
    FileElementComponent,
    DirElementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
