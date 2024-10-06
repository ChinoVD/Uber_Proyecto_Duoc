import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ViewADMINPageRoutingModule } from './view-admin-routing.module';
import { ViewAdminPage } from './view-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewADMINPageRoutingModule
  ],
  declarations: [ViewAdminPage]
})
export class ViewAdminPageModule {}
