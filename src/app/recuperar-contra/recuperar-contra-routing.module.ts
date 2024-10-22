import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecuperarContraPage } from './recuperar-contra.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarContraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarContraPageRoutingModule {}
