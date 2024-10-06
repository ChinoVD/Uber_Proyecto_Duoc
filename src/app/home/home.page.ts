import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../Servicios_Internos/Api/api-rest.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  selector: string = 'viajes';
  productos: any[] = [];  // Definición de la variable productos

  constructor(private api: ApiRestService) {}

  ngOnInit() {
    this.obtenerProductos('viajes');
  }

  obtenerProductos(grupo: string) {
    this.api.traerProductosPorGrupo(grupo).subscribe(
      (data: any) => {
        this.productos = data;  // Asignamos los productos obtenidos
      },
      (error) => {
        console.error('Error al obtener productos:', error); // Manejo de errores
      }
    );
  }

  onSegmentChange(event: any) {
    this.obtenerProductos(event.detail.value);
  }
}
