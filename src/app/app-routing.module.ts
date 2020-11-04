import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileListComponent } from './components/file-list/file-list.component'
import { SidebarComponent } from './components/sidebar/sidebar.component'
import { FileElementComponent } from './components/file-element/file-element.component'
import { DirElementComponent } from './components/dir-element/dir-element.component'

const routes: Routes = [
  { path : "", redirectTo : 'file-element', pathMatch : 'full'},
  { path: "file-list", component : FileListComponent},
  { path: "sidebar", component : SidebarComponent},
  { path: "file-element", component : FileElementComponent},
  { path: "dir-element", component : DirElementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
