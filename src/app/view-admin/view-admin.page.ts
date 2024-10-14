import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../Servicios_Internos/Api/api-rest.service';
import { Observable } from 'rxjs'; // Importar Observable

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.page.html',
  styleUrls: ['./view-admin.page.scss'],
})
export class ViewAdminPage implements OnInit {
  productos: any[] = []; // Lista de productos
  producto: string = '';
  detalle: string = '';
  precio: number | null = null;
  imageUrl: string = '';
  categoria: string = '';
  grupo: string = 'Chino_Claudio';
  idProducto: number | null = null; // ID para editar
  idProductoEliminar: number | null = null; // ID para eliminar
  opcionSeleccionada: string = 'subir'; // Valor inicial para el ion-segment

  private baseUrl: string = 'https://myths.cl/api'; // Definir baseUrl

  constructor(private api: ApiRestService) {}

  ngOnInit() {
    this.obtenerProductos(this.grupo); // Llama a la función para obtener productos
  }

  traerProductosPorGrupo(grupo: string): Observable<any> {
    return this.api.traerProductosPorGrupo(grupo); // Cambiar esto si es necesario
  }

  // Llama a esta función para obtener productos
  obtenerProductos(grupo: string) {
    this.traerProductosPorGrupo(grupo).subscribe(
      (data: any) => {
        this.productos = data; // Guarda los productos obtenidos
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

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

  // Método para editar un producto
  editarProducto() {
    if (this.idProducto !== null) {  // Asegúrate de que el ID no sea nulo
      const productoEditado = {
        id: this.idProducto,
        nombre: this.producto,
        descripcion: this.detalle,
        precio: this.precio,
        imageUrl: this.imageUrl,
        categoria: this.categoria
      };

      this.api.editarProducto(productoEditado).subscribe(
        response => {
          console.log('Producto editado con éxito:', response);
          // Notificación al usuario sobre el éxito
        },
        error => {
          console.error('Error al editar el producto:', error);
        }
      );
    } else {
      console.error('ID del producto no especificado para editar');
    }
  }

  // Método para eliminar un producto
eliminarProducto() {
  if (this.idProductoEliminar !== null) {  // Asegúrate de que el ID no sea nulo
    const grupo = this.grupo;  // Usa el grupo definido en la clase

    this.api.eliminarProducto(this.idProductoEliminar, grupo).subscribe(
      response => {
        console.log('Producto eliminado con éxito:', response);
        this.resetEliminarForm(); // Reinicia el formulario de eliminación
        this.obtenerProductos(grupo); // Actualiza la lista de productos
      },
      error => {
        console.error('Error al eliminar el producto:', error);
        // Aquí puedes manejar el error
      }
    );
  } else {
    console.error('ID del producto no especificado para eliminar');
  }
}

// Método para reiniciar el formulario de eliminación
private resetEliminarForm() {
  this.idProductoEliminar = null; // Reinicia el ID del producto a eliminar
}
}
