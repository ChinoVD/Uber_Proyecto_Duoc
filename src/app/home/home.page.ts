import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../Servicios_Internos/Api/api-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  grupo: string = 'Chino_Claudio'; // Asegúrate de que este grupo exista en tu API
  selector: string = 'viajes';  // Cambia esto a la categoría inicial que desees
  productos: any[] = [];  // Definición de la variable productos

  constructor(private api: ApiRestService) {}

  ngOnInit() {
    this.obtenerProductos(this.selector); // Llamar al método para obtener productos al iniciar
  }

  obtenerProductos(grupo: string) {
    this.api.traerProductosPorGrupo(this.grupo).subscribe(
      (data: any) => {
        console.log('Respuesta de la API:', data); // Agregar esta línea para depurar
        this.productos = Array.isArray(data) ? data : []; // Asegurarse de que la respuesta sea un array
      },
      (error) => {
        console.error('Error al obtener productos:', error); // Manejo de errores
      }
    );
  }

  onSegmentChange(event: any) {
    this.obtenerProductos(event.detail.value); // Llamar al método cuando cambia el segmento
  }
}
