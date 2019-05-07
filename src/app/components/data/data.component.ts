import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma: FormGroup;

  usuario: Object = {
    nombreCompleto : {
      nombre: "Chema",
      apellidos: "Alfonso"
    },
    email: "micorreo@correo.com"
    //pasatiempos: ["Correr", "Dormir", "Comer"]
  }

  constructor() {

    console.log(this.usuario);

    this.forma = new FormGroup({

      'nombreCompleto': new FormGroup({

        'nombre':    new FormControl( '', [
          Validators.required,
          Validators.minLength(3)
        ]),
        'apellidos': new FormControl( '', [
                                            Validators.required,
                                            this.noAlfonso
                                          ])

      }),

      'email':     new FormControl( '', [
                                          Validators.required,
                                          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
                                        ]),

      'pasatiempos': new FormArray([
        new FormControl('', Validators.required)
      ]),
      'user': new FormControl('', Validators.required, this.userExists),
      'pass1': new FormControl('', Validators.required),
      'pass2': new FormControl(),

    });

    // Asignar valor por defecto
    //this.forma.setValue( this.usuario );

    this.forma.controls['pass2'].setValidators([
      Validators.required,
      this.noIgual.bind( this.forma )
    ]);

    this.forma.controls['user'].valueChanges
        .subscribe( data => {
          console.log(data);
        });

    this.forma.controls['user'].statusChanges
      .subscribe( data => {
        console.log(data);
      })

   }

  ngOnInit() {
  }

  guardarCambios(){

    // Forma 1
    //this.forma.reset( this.usuario );

    /* Forma 2
    this.forma.reset( {
        nombreCompleto : {
          nombre: "",
          apellidos: ""
        },
        email: ""
      }
    );
    */
  }

  agregarPasatiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('Caminar', Validators.required)
    )
  }

  noAlfonso( control: FormControl ): { [s: string]: boolean }{

    if (control.value === "Alfonso"){
      return {
        noAlfonso: true
      }
    }

    return null;

  }

  
  noIgual( control: FormControl ): { [s: string]: boolean }{

    let forma: any = this;


    if (control.value !== forma.controls['pass1'].value){
      return {
        noIgual: true
      }
    }

    return null;

  }

  userExists( control: FormControl): Promise<any> | Observable<any> {

    let promesa = new Promise(
      ( resolve , reject ) => {

        setTimeout(() => {
            if (control.value === "strider"){
                resolve( {existe: true})
            } else {
                resolve(null);
            }
        }, 3000)

      }
    )

    return promesa;
  }

}
