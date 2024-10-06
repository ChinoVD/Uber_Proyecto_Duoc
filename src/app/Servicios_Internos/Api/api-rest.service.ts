import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  private baseUrl = 'https://myths.cl/api';

  constructor(private http: HttpClient) {}

  crearGrupo(nombre: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/grupos.php`, { nombre });
  }

  eliminarGrupo(nombre: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/grupos.php?nombre=${nombre}`);
  }

  // Nuevo método para subir imágenes
  subirImagen(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', file);
    
    // Cambia la URL según sea necesario
    return this.http.post(`${this.baseUrl}/subir-imagen.php`, formData); 
  }

  agregarProducto(producto: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/productos.php`, producto);
  }

  editarProducto(producto: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/productos.php`, producto);
  }

  eliminarProducto(id: number, grupo: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/productos.php`, { body: { id, grupo } });
  }

  traerProductosPorGrupo(grupo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/productos.php?grupo=${grupo}`);
  }

  traerProductosPorCategoria(grupo: string, categoria: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/productos.php?grupo=${grupo}&categoria=${categoria}`);
  }
}
