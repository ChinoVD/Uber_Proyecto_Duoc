import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario = '';
  password = '';
  intentosFallidos = 0; // Contador de intentos fallidos
  mostrarRecuperar = false; // Para mostrar el mensaje de recuperar contraseña

  constructor(
    private anim: AnimationController,
    private router: Router,
    private alerta: AlertController
  ) {}

  ngOnInit() {}

  login() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioValido = usuarios.find((user: any) => user.usuario === this.usuario);
    const passwordValido = usuarioValido && usuarioValido.password === this.password;

    if (passwordValido) {
       // Guardar el ID del usuario que inició sesión en el localStorage
      localStorage.setItem('idUsuarioActual', usuarioValido.id.toString());

      this.intentosFallidos = 0;
      this.mostrarRecuperar = false;
      this.mostrarAlerta(`Bienvenido, ${this.usuario}!`, () => {
        this.router.navigate(['/home']);
      });
    } else {
      this.intentosFallidos++;
      
      if (this.intentosFallidos >= 3) {
        this.mostrarRecuperar = true;
      }

      if (this.usuario.trim() === '') {
        this.animarError('usuarioInput');
      } else if (!usuarioValido) {
        this.animarError('usuarioInput');
      }

      if (this.password.trim() === '') {
        this.animarError('passwordInput');
      } else if (!passwordValido) {
        this.animarError('passwordInput');
      }

      this.mostrarAlerta('Usuario o contraseña incorrectos');
    }
  }

  irRecuperarContrasena() {
    this.router.navigate(['/recuperar-contra']);
  }

  async mostrarAlerta(text: string, accion?: () => void) {
    const alert = await this.alerta.create({
      header: 'Información',
      message: text,
      buttons: [{
        text: 'Aceptar',
        handler: accion
      }]
    });
    alert.present();
  }

  animarError(inputId: string) {
    const inputElement = document.getElementById(inputId);

    if (inputElement) {
      this.anim.create()
        .addElement(inputElement)
        .duration(300)
        .iterations(3)
        .keyframes([
          { offset: 0, border: '1px transparent solid', transform: 'translateX(0px)' },
          { offset: 0.25, border: '1px red solid', transform: 'translateX(-5px)' },
          { offset: 0.5, border: '1px transparent solid', transform: 'translateX(0px)' },
          { offset: 0.75, border: '1px red solid', transform: 'translateX(5px)' },
          { offset: 1, border: '1px transparent solid', transform: 'translateX(0px)' },
        ])
        .play();
    }
  }

  registro_usuario() {
    this.router.navigate(['/crear-cuenta']);
  }
}
