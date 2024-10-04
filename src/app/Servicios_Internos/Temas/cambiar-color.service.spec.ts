import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CambiarColorService {

  constructor() { }

  cambiarColor(color: string) {
    document.documentElement.style.setProperty('--fondo-oscuro', color);
  }
}
