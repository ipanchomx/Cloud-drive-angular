import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { TestmaterialComponent } from './pages/testmaterial/testmaterial.component';
import { PendingFilesSharedComponent } from './pages/pending-files-shared/pending-files-shared.component'
import { FileManagerComponent } from './pages/file-manager/file-manager.component';

import { SidebarComponent } from './components/sidebar/sidebar.component'
import { FileElementComponent } from './components/file-element/file-element.component'
import { DirElementComponent } from './components/dir-element/dir-element.component'
import { GridListComponent } from './components/grid-list/grid-list.component'
import { NavbarComponent } from './components/navbar/navbar.component';


const routes: Routes = [
  { path : "", redirectTo : 'file-manager', pathMatch : 'full'},
  { path: "sidebar", component : SidebarComponent},
  { path: "file-element", component : FileElementComponent},
  { path: "dir-element", component : DirElementComponent},
  { path: "test", component: TestmaterialComponent},
  { path: "settings", component: SettingsComponent},
  { path: "grid-list", component: GridListComponent},
  { path: "pending-files-shared", component: PendingFilesSharedComponent},
  { path: "file-manager", component: FileManagerComponent},
  { path: "navbar", component: NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
