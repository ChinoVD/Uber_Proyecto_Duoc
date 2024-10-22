import { Component, OnInit } from '@angular/core';
import { ApiRecuperarPswService } from '../Servicios_Internos/Api/api-recuperar-psw.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

interface Usuario {
  usuario: string;
  password: string;
  email: string;
}

@Component({
  selector: 'app-recuperar-contra',
  templateUrl: './recuperar-contra.page.html',
  styleUrls: ['./recuperar-contra.page.scss'],
})
export class RecuperarContraPage implements OnInit {
  email: string = '';         // Almacena el correo electrónico ingresado
  nombre: string = '';        // Almacena el nombre del usuario
  password: string = '';      // Almacena la nueva contraseña
  app: string = 'UBER_UWU';   // Almacena el nombre de la app

  constructor(
    private apiRecuperarPsw: ApiRecuperarPswService,
    private alerta: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  enviarSolicitudRecuperacion() {
    const usuarioGuardado = this.obtenerUsuarioPorEmail(this.email); // Obtener el usuario por el email

    if (usuarioGuardado && usuarioGuardado.usuario === this.nombre) {
      const solicitud = {
        nombre: this.nombre,
        app: this.app,
        email: this.email,
        clave: this.password,
      };

      // Lógica para enviar la solicitud a la API
      this.apiRecuperarPsw.enviarCorreoRecuperacion(solicitud).subscribe({
        next: (response: any) => {
          this.mostrarAlerta('Éxito', 'Correo de recuperación enviado correctamente.');
          this.guardarNuevaContraseña(this.password); // Guarda la nueva contraseña
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          this.mostrarAlerta('Error', 'Hubo un problema al enviar el correo. Inténtalo de nuevo más tarde.');
        }
      });
    } else {
      this.mostrarAlerta('Error', 'El nombre de usuario o el correo no coinciden.');
    }
  }

  obtenerUsuarioPorEmail(email: string): Usuario | null {
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return usuarios.find(user => user.email === email) || null;
  }

  volverAlLogin() {
    this.router.navigate(['/login']);
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alerta.create({
      header,
      message,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  guardarNuevaContraseña(nuevaContraseña: string) {
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioIndex = usuarios.findIndex(user => user.email === this.email);

    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].password = nuevaContraseña; // Actualiza la contraseña
      localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guarda el array actualizado
    }
  }
}
