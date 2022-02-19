import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {io, Socket} from 'socket.io-client';
import {PriorityQueue} from '../../Class/PriorityQueue/priority-queue'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-turns',
  templateUrl: './turns.component.html',
  styleUrls: ['./turns.component.scss']
})

export class TurnsComponent implements OnInit {
  //socket: Socket = io('http://localhost:300');
  motive = [
    { value: 1, viewValue: 'Vitrina nuevos'},
    { value: 3, viewValue: 'Cliente antiguos'},
    { value: 4, viewValue: 'Negocios'},
    { value: 5, viewValue: 'Entregas'},
    { value: 6, viewValue: 'Usados'},
    { value: 7, viewValue: 'Chevyplan'},
    { value: 8, viewValue: 'Repuestos'},
    { value: 9, viewValue: 'Taller'},
    { value: 10, viewValue: 'Servicio al cliente'},
    { value: 11, viewValue: 'Administracion'},
    { value: 25, viewValue: 'Cita digital'},
    { value: 26, viewValue: 'Taxis'}
  ]
  visit= new FormGroup({
    motive: new FormControl('', Validators.required ),
  });

  
  turns= new PriorityQueue();
  
  displayedColumns: string[] = ['Posicion','Nombre','Estado', 'Hora registro'];

  constructor( public dialog: MatDialog) { }

  ngOnInit(): void {
    //this.GetTurns();
  }

  

  /*GetTurns(){
    this.socket.connect();
    this.socket.on('test',(arg) =>{
      console.log(JSON.parse(arg.turns));
      this.turns.setData(JSON.parse(arg.turns));
    })
  }*/

  Popturns(){
    this.turns.dequeue();
  }

  openDialog(){
    if( this.visit.valid){
      
      const dialogRef = this.dialog.open(DialogContentExampleDialog,{
        width: '900px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log( JSON.parse(result) );
      });
      
    }
  }
}



@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls: ['./turns.component.scss']
})
export class DialogContentExampleDialog {

  Form= new FormGroup({
    firstName: new FormControl('',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z ]*')]) ),
    lastName: new FormControl('',Validators.compose([Validators.required,Validators.pattern('[a-zA-Z ]*')])),
    cellphone: new FormControl('',Validators.compose([Validators.required,Validators.pattern('[0-9]+')])),
    email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    vh: new FormControl('',Validators.required),
    use_vh: new FormControl('',Validators.required),
    retoma: new FormControl(false),
    financed: new FormControl(false)
  });

  vehicles: any = [];

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
  foods = [
    {value: 0, viewValue: 'Primer vehiculo'},
    {value: 1, viewValue: 'Vehiculo familiar'},
    {value: 2, viewValue: 'Vehiculo trabajo'},
    {value: 3, viewValue: 'Renovacion vehiculo'},
    {value: 4, viewValue: 'Vehiculo usado'},
  ];
  backendHost:string = 'http://localhost:8001';
  constructor(private httpClient : HttpClient, private dialogRef: MatDialogRef<DialogContentExampleDialog> ){}

  ngOnInit(): void {
    this.GetVh_interes();
  }

  GetVh_interes(){
    this.httpClient.get(`${this.backendHost}/api/vh_interes`).subscribe(res=>{
      this.vehicles = res;
    })
  }

  closeDialog(){
    if( this.Form.valid){
      this.dialogRef.close(JSON.stringify(this.Form.getRawValue()) );
    }
  }

}