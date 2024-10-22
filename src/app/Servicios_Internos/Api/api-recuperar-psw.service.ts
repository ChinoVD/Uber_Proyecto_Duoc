import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiRecuperarPswService {

  private apiUrl = 'https://myths.cl/api/reset_password.php'; // URL de la API

  constructor(private http: HttpClient) {}

  // Modificado para recibir un objeto en lugar de solo un string
  enviarCorreoRecuperacion(data: { nombre: string; app: string; email: string; clave: string; }): Observable<any> {
    // El objeto 'data' ya contiene los valores correctos
    return this.http.post(this.apiUrl, data); // Envía una solicitud POST a la API con el objeto
  }
}
  