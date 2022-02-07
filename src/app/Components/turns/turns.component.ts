import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

interface Uses {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-turns',
  templateUrl: './turns.component.html',
  styleUrls: ['./turns.component.scss']
})
export class TurnsComponent implements OnInit {

  Form= new FormGroup({
    firstName: new FormControl('',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z ]*')]) ),
    lastName: new FormControl('',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z ]*')])),
    cellphone: new FormControl('',Validators.compose([Validators.required,Validators.pattern('/^[0-9]*$/')])),
    email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    vh: new FormControl('',Validators.required),
    use_vh: new FormControl('',Validators.required),
    retoma: new FormControl(false),
    financed: new FormControl(false)
  });
  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  foods: Uses[] = [
    {value: 0, viewValue: 'Primer vehiculo'},
    {value: 1, viewValue: 'Vehiculo familiar'},
    {value: 2, viewValue: 'Vehiculo trabajo'},
    {value: 3, viewValue: 'Renovacion vehiculo'},
    {value: 4, viewValue: 'Vehiculo usado'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
