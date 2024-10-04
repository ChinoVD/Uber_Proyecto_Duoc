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

  navegar(){
    this.routing.navigate(['/ajustes'])
  }

  ngOnInit() {
  }

}
