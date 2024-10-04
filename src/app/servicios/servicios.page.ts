import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {

  constructor(
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
  }

  imagenVisible: boolean = false;

  mostrarImagen() {
    const fantasmas = [
      { id: 'fantasma1', from: 'translateY(100px)', to: 'translateY(-950px)' },
      { id: 'fantasma2', from: 'translateY(0px)', to: 'translateY(-850px)' },
      { id: 'fantasma3', from: 'translateY(0px)', to: 'translateY(-750px)' }
    ];
  
    fantasmas.forEach(fantasma => {
      const fantasmaElement = document.querySelector(`#${fantasma.id}`);
      if (fantasmaElement) {
        this.animationCtrl.create()
          .addElement(fantasmaElement)
          .duration(5000) // Duración de la animación en milisegundos
          
          .fromTo("transform", fantasma.from, fantasma.to) 
          
          .play();
      }
    });
  
    // Ocultar las imágenes después de 3 segundos 
    setTimeout(() => {
      this.imagenVisible = false;
    }, 3000); 
  }
}
