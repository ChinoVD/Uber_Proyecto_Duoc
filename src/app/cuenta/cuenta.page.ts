import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  constructor(
    private routing: Router
  ) { }
  nombre: string = '';

  navegarAjustes(){
    this.routing.navigate(['/ajustes'])
  }

  ngOnInit() {
    // Obtener datos del local storage
    const usuarioGuardado = localStorage.getItem('usuarios');
    const idUsuarioActual = localStorage.getItem('idUsuarioActual'); // Obtener el ID almacenado
  
    if (usuarioGuardado && idUsuarioActual) {
      const usuarios = JSON.parse(usuarioGuardado); 
      // Buscar el usuario con el ID correspondiente
      const usuarioActual = usuarios.find((user: any) => user.id.toString() === idUsuarioActual);
  
      if (usuarioActual) {
        this.nombre = usuarioActual.usuario || '';
      } else {
        console.log("Usuario no encontrado.");
      }
    } else {
      console.log("No hay usuarios guardados o no hay sesión activa.");
    }}

}
