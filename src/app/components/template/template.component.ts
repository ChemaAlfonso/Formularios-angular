import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit {

  usuario: Object = {
    nombre: null,
    apellido: null,
    email: null,
    pais: '',
    sexo: 'Mujer',
    acepto: false
  };

  paises = [
    {
      codigo: 'ESP',
      pais: 'España'
    },
    {
      codigo: 'CRI',
      pais: 'Costa Rica'  
    }
  ];

  sexos: string[] = ["Hombre", "Mujer"];

  constructor() { }

  ngOnInit() {
  }

  guardar( forma: NgForm ){
    console.log(forma);
  }

}
