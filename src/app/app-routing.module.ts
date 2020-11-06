import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileInformationComponent } from './pages/file-information/file-information.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PendingFilesSharedComponent } from './pages/pending-files-shared/pending-files-shared.component'
import { FileManagerComponent } from './pages/file-manager/file-manager.component';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "settings", component: SettingsComponent },
  { path: "file-info", component: FileInformationComponent },
  { path: "settings", component: SettingsComponent },
  { path: "pending-files-shared", component: PendingFilesSharedComponent },
  { path: "file-manager", component: FileManagerComponent },
  { path: 'home', component: HomeComponent },
  { path: "settings", component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
