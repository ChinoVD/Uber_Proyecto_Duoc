import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Sección variables
  usuario = "";
  password = "";

  constructor(
    private anim: AnimationController,
    private router: Router,
    private alerta: AlertController
  ) { }

  ngOnInit() {}

  login() {
    const usuarioValido = this.usuario === "PixelEditionHD";
    const passwordValido = this.password === "Completos2212";
    
    if (usuarioValido && passwordValido) {
      this.mostrarAlerta(`Bienvenido, ${this.usuario}!`, () => {
        this.router.navigate(['/home']);
      });
    } else {
      if (this.usuario.trim() === "") {
        this.animarError('usuarioInput'); 
      } else if (!usuarioValido) {
        this.animarError('usuarioInput'); 
      }
  
      if (this.password.trim() === "") {
        this.animarError('passwordInput'); 
      } else if (!passwordValido) {
        this.animarError('passwordInput'); 
      }
    }
  }

  async mostrarAlerta(text: string, accion?: () => void) {
    const alert = await this.alerta.create({
      header: "Información",
      message: text,
      buttons: [{
        text: "Aceptar",
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

  registro_usuario(){
    this.router.navigate(['/crear-cuenta'])
  }
}
