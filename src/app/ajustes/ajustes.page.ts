import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.page.html',
})
export class AjustesPage {
  @ViewChild(IonModal) modal!: IonModal;

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
      email: this.email,
      password: this.password,
      direccion: this.direccion,
      tarjeta: this.tarjeta
    }, 'confirmar');
  }

  // Función que se ejecuta cuando el modal se cierra
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<any>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Nombre: ${ev.detail.data.name}, Apellido: ${ev.detail.data.surname}, Correo: ${ev.detail.data.email}`;
    }
  }

  ngOnInit() {
    // Obtener datos del local storage
    const usuarioGuardado = localStorage.getItem('usuarios');
    
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      // Si hay datos guardados, rellenar los campos correspondientes
      this.nombre = usuario[0].usuario || '';
      this.email = usuario.email || '';
      this.password = usuario.password || '';
      this.direccion = usuario.direccion || '';
      this.apellido = usuario.apellido || '';
      this.tarjeta = usuario.tarjetaCredito || '';
    }
  }
     
  saveData() {
    // Actualizar el objeto de usuario con los nuevos datos
    const usuarioActualizado = {
      usuario: this.nombre,
      password: this.password,
      email: this.email,
      direccion: this.direccion,
      apellido: this.apellido,
      tarjetaCredito: this.tarjeta
    };
  
    // Guardar los datos actualizados en el local storage
    localStorage.setItem('usuarios', JSON.stringify(usuarioActualizado));
  }
}
