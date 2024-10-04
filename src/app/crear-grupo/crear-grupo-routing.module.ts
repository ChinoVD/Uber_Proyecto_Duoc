import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearGrupoPage } from './crear-grupo.page';

const routes: Routes = [
  {
    path: '',
    component: CrearGrupoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearGrupoPageRoutingModule {}
