import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewAdminPage } from './view-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ViewAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewADMINPageRoutingModule {}
