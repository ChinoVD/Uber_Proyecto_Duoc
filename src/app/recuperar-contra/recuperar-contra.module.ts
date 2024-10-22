import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecuperarContraPageRoutingModule } from './recuperar-contra-routing.module';
import { RecuperarContraPage } from './recuperar-contra.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarContraPageRoutingModule
  ],
  declarations: [RecuperarContraPage]
})
export class RecuperarContraPageModule {}
