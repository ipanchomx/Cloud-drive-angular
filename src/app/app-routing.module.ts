import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { TestmaterialComponent } from './pages/testmaterial/testmaterial.component';

const routes: Routes = [
  { path: "", component: TestmaterialComponent},
  { path: "settings", component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
