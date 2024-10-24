import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // Cambié Route a Router
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
})
export class AjustesPage {
  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private router: Router // Cambié Route a Router
  ) {}

  // Variables para los campos
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  password: string = '';
  direccion: string = '';
  tarjeta: string = '';
  message: string = '';

  // Variable para manejar la apertura y cierre del modal
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  // Función para cancelar el modal
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  // Función para confirmar y enviar los datos
  confirmar() {
    this.saveData();
    this.modal.dismiss({
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email
    }, 'confirmar');
  }

  // Función que se ejecuta cuando el modal se cierra
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<any>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Nombre: ${ev.detail.data.nombre}, Apellido: ${ev.detail.data.apellido}, Correo: ${ev.detail.data.email}`;
    }
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
        this.email = usuarioActual.email || '';
        this.password = usuarioActual.password || '';
        this.apellido = usuarioActual.apellido || '';
        this.direccion = usuarioActual.direccion || '';
        this.tarjeta = usuarioActual.tarjetaCredito || '';
      } else {
        console.log("Usuario no encontrado.");
      }
    } else {
      console.log("No hay usuarios guardados o no hay sesión activa.");
    }
  }

  saveData() {
    // Obtener usuarios existentes
    const usuarioGuardado = localStorage.getItem('usuarios');
    let usuarios = usuarioGuardado ? JSON.parse(usuarioGuardado) : [];

    // Actualizar el objeto de usuario con los nuevos datos
    const idUsuarioActual = localStorage.getItem('idUsuarioActual');
    const usuarioActualizado = {
      id: parseInt(idUsuarioActual || '0'), // Asegúrate de tener el ID
      usuario: this.nombre,
      password: this.password,
      email: this.email,
      direccion: this.direccion,
      apellido: this.apellido,
      tarjetaCredito: this.tarjeta
    };

    // Buscar y actualizar el usuario
    const index = usuarios.findIndex((user: any) => user.id.toString() === idUsuarioActual);
    if (index !== -1) {
      usuarios[index] = usuarioActualizado; // Actualizar el usuario existente
    } else {
      usuarios.push(usuarioActualizado); // Si no existe, agregar como nuevo
    }
  
    // Guardar los datos actualizados en el local storage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  cerrarSesion() {
    // Limpiar el localStorage para eliminar la sesión
    localStorage.setItem('idUsuarioActual', '0');

  
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
