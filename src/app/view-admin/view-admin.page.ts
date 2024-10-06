import { Component } from '@angular/core';
import { ApiRestService } from '../Servicios_Internos/Api/api-rest.service';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.page.html',
  styleUrls: ['./view-admin.page.scss'],
})
export class ViewAdminPage {
  producto: string = '';
  detalle: string = '';
  precio: number | null = null;
  imageUrl: string = ''; // Para la URL de la imagen
  categoria: string = ''; // Deja esto vacío si no quieres usar categorías
  grupo: string = 'NOMBREGRUPO'; // Cambia esto según tu necesidad

  constructor(private api: ApiRestService) {}

  // Método para establecer la URL de la imagen
  setImageUrl(url: string) {
    this.imageUrl = url;
  }

  subirProducto() {
    if (this.imageUrl && this.producto && this.detalle && this.precio !== null) {
      const formData = {
        producto: this.producto,
        detalle: this.detalle,
        precio: this.precio || '',
        imagen: this.imageUrl, // Usar directamente la URL de la imagen
        categoria: this.categoria || '', // Si no se proporciona, se deja vacío
        grupo: this.grupo || '' // Igual aquí
      };

      // Ahora llamamos a la API para agregar el producto
      this.api.agregarProducto(formData).subscribe(
        response => {
          console.log('Producto subido con éxito:', response);
          // Reseteamos el formulario
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
    this.imageUrl = ''; // Restablecer la URL de la imagen
    this.categoria = '';
  }
}
