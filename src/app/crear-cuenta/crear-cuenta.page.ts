  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { AlertController, AnimationController } from '@ionic/angular';

  interface Usuario {
    usuario: string;
    password: string;
    email: string;  // Agregamos el campo de email a la interfaz
  }

  @Component({
    selector: 'app-crear-cuenta',
    templateUrl: './crear-cuenta.page.html',
    styleUrls: ['./crear-cuenta.page.scss'],
  })
  export class CrearCuentaPage implements OnInit {
    nuevoUsuario = '';
    nuevaPassword = '';
    v_password = '';
    email = '';  // Variable para el correo electrónico

    constructor(
      private anim: AnimationController,
      private router: Router,
      private alerta: AlertController
    ) {}

    ngOnInit() {}

    // Método para registrar un nuevo usuario
    registrarUsuario() {
      if (this.nuevoUsuario && this.nuevaPassword && this.v_password && this.email) {
        if (this.nuevaPassword === this.v_password) {
          const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]'); // Obtener usuarios existentes o array vacío
          const usuarioExiste = usuarios.find((user: Usuario) => user.usuario === this.nuevoUsuario); // Especificar el tipo de user

          if (!usuarioExiste) {
            // Agregar el nuevo usuario al array
            usuarios.push({ usuario: this.nuevoUsuario, password: this.nuevaPassword, email: this.email });
            // Guardar el array actualizado en localStorage
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // Mostrar mensaje de éxito y redirigir al login
            this.mostrarAlerta('Usuario registrado con éxito', () => {
              this.router.navigate(['/login']);
            });
          } else {
            this.mostrarAlerta('El usuario ya existe, elige otro nombre');
          }
        } else {
          this.mostrarAlerta('Las contraseñas no coinciden');
        }
      } else {
        this.mostrarAlerta('Por favor, completa todos los campos');
      }
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

    // Método para animar los campos en caso de error
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
  }
