import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileInformationComponent } from './pages/file-information/file-information.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { TestmaterialComponent } from './pages/testmaterial/testmaterial.component';

const routes: Routes = [
  { path: "", component: FileInformationComponent},
  { path: "settings", component: SettingsComponent},
  { path: "file-info", component: FileInformationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
