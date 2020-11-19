import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileInformationComponent } from './pages/file-information/file-information.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PendingFilesSharedComponent } from './pages/pending-files-shared/pending-files-shared.component'
import { FileManagerComponent } from './pages/file-manager/file-manager.component';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthGuard } from './globals/guards/auth.guard';
import { UnAuthGuard } from './globals/guards/un-auth.guard';
import { TestComponent } from './pages/test/test.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard]},
  { path: "file-info", component: FileInformationComponent, canActivate: [AuthGuard]},
  { path: "pending-files-shared", component: PendingFilesSharedComponent, canActivate: [AuthGuard]},
  { path: "file-manager", component: FileManagerComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [UnAuthGuard]},
  { path: 'sign-up', component: SignUpComponent, canActivate: [UnAuthGuard]},
  { path: 'test', component: TestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
