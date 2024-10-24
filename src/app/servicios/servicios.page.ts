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
      this.imagenVisible = true;
      const fantasmas = [
        { id: 'fantasma1', from: 'translate(0px, 100px)', to: 'translate(0px, -950px)' }, // Sin desplazamiento horizontal
        { id: 'fantasma2', from: 'translate(-50px, 0px)', to: 'translate(-50px, -850px)' }, // Desplazado a la izquierda
        { id: 'fantasma3', from: 'translate(50px, 0px)', to: 'translate(50px, -750px)' }   // Desplazado a la derecha
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
      }, 5000); 
    }
  }
