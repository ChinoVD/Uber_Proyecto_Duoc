import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FuncionCgService {
  private baseUrl = 'https://myths.cl/api'; // Asegúrate de que esta URL sea correcta.

  constructor(private http: HttpClient) {}

  crearGrupo(nombre: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/grupos.php`, { nombre });
  }
}
