import { Component } from '@angular/core';
import { ApiRestService } from '../Servicios_Internos/Api/api-rest.service';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.page.html',
  styleUrls: ['./view-admin.page.scss'],
})
export class ViewAdminPage {
  productos: any[] = []; // Si deseas mostrar productos en esta página
  producto: string = '';
  detalle: string = '';
  precio: number | null = null;
  imageUrl: string = '';
  categoria: string = '';
  grupo: string = 'Chino_Claudio';

  constructor(private api: ApiRestService) {}

  // Método para subir un producto
  subirProducto() {
    if (this.imageUrl && this.producto && this.detalle && this.precio !== null) {
      const formData = {
        producto: this.producto,
        detalle: this.detalle,
        precio: this.precio,
        imagen: this.imageUrl,
        categoria: this.categoria || '',
        grupo: this.grupo || ''
      };

      this.api.agregarProducto(formData).subscribe(
        response => {
          console.log('Producto subido con éxito:', response);
          this.resetForm();
        },
        error => {
          console.error('Error al subir el producto:', error);
        }
      );
    } else {
      console.error('Faltan parámetros para subir el producto');
    }
  }

  private resetForm() {
    this.producto = '';
    this.detalle = '';
    this.precio = null;
    this.imageUrl = '';
    this.categoria = '';
  }

  // Aquí puedes agregar métodos para modificar y eliminar productos si es necesario
}
