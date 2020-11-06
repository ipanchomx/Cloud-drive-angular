import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FileElementComponent } from './components/file-element/file-element.component';
import { DirElementComponent } from './components/dir-element/dir-element.component';
import { HomeComponent } from './pages/home/home.component';
import { NavBarComponent } from './globals/layouts/nav-bar/nav-bar.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { PendingFilesSharedComponent } from './pages/pending-files-shared/pending-files-shared.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FileManagerComponent } from './pages/file-manager/file-manager.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FileElementComponent,
    DirElementComponent,
    HomeComponent,
    NavBarComponent,
    SettingsComponent,
    GridListComponent,
    PendingFilesSharedComponent,
    FileManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
