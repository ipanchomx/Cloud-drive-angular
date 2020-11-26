import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';

import { HttpClientModule } from '@angular/common/http';

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
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UploadFileFormComponent } from './dialogs/upload-file-form/upload-file-form.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from './../environments/environment';
import { MaterialModule } from './modules/material/material.module';
import { CreateFolderFormComponent } from './dialogs/create-folder-form/create-folder-form.component';
import { SharedFilesComponent } from './pages/shared-files/shared-files.component';
import { Page404Component } from './pages/page404/page404.component';
import { ShareFileDialogComponent } from './dialogs/share-file-dialog/share-file-dialog.component';
import { NotificationsComponent } from './dialogs/notifications/notifications.component';
import { UpdateFileDialogComponent } from './dialogs/update-file-dialog/update-file-dialog.component';
import { ChangePhotoFormComponent } from './dialogs/change-photo-form/change-photo-form.component';

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
    SignUpComponent,
    UploadFileFormComponent,
    CreateFolderFormComponent,
    SharedFilesComponent,
    Page404Component,
    ShareFileDialogComponent,
    NotificationsComponent,
    UpdateFileDialogComponent,
    ChangePhotoFormComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.clientId
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
