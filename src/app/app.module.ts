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
import { FileInformationComponent } from './pages/file-information/file-information.component';
import { FileManagerComponent } from './pages/file-manager/file-manager.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FileElementComponent,
    DirElementComponent,
    HomeComponent,
    NavBarComponent,
    SettingsComponent,
    PendingFilesSharedComponent,
    FileInformationComponent,
    GridListComponent,
    FileManagerComponent,
    SignUpComponent
  ],
  imports : [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSliderModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
