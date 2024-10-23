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
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  address: string = '';
  creditCard: string = '';
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
  confirm() {
    this.modal.dismiss({
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      address: this.address,
      creditCard: this.creditCard
    }, 'confirm');
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
      this.name = usuario.usuario;
      this.email = usuario.email;
      this.password = usuario.password;
      this.address = usuario.direccion || '';
      this.surname = usuario.apellido || '';
      this.creditCard = usuario.tarjetaCredito || '';
    }
  }
  
  saveData() {
    // Actualizar el objeto de usuario con los nuevos datos
    const usuarioActualizado = {
      usuario: this.name,
      password: this.password,
      email: this.email,
      direccion: this.address,
      apellido: this.surname,
      tarjetaCredito: this.creditCard
    };
  
    // Guardar los datos actualizados en el local storage
    localStorage.setItem('usuarios', JSON.stringify(usuarioActualizado));
  }
}
