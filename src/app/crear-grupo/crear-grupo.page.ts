import { Component } from '@angular/core';
import { ApiRestService } from '../Servicios_Internos/Api/api-rest.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.page.html',
  styleUrls: ['./crear-grupo.page.scss'],
})
export class CrearGrupoPage {
  nombreGrupo: string = '';

  constructor(private apiService: ApiRestService) {}

  crearGrupo() {
    if (this.nombreGrupo) {
      this.apiService.crearGrupo(this.nombreGrupo).subscribe(
        (response) => {
          console.log('Grupo creado:', response);
          // Aquí puedes agregar lógica adicional, como mostrar un mensaje de éxito
        },
        (error) => {
          console.error('Error al crear grupo:', error);
          // Maneja el error aquí
        }
      );
    } else {
      console.log('Por favor, ingresa un nombre para el grupo.');
    }
  }
}
