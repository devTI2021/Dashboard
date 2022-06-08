import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { SessionService } from '../../Service/Session/session.service';
import { AppSettings } from '../../Config/constants'
import {formatDate} from '@angular/common';

export interface Person {
  typeID: string;
  nit: number;
  lastname: string;
  name: string;
  cellphone: number;
  mail: string;
}

export interface TurnsAssignament {
  customer: string;
  seller: string;
  date: string;
  nit: number
}

export interface Turns {
  turno: number, 
  id_turno: number, 
  nit_asesor: number, 
  asesor: string,
  usuario_as: string
}

export interface Visits {
  month: string;
  day: string,
  count: number,
}

@Component({
  selector: 'app-turns',
  templateUrl: './turns.component.html',
  styleUrls: ['./turns.component.scss']
})

export class TurnsComponent implements OnInit {

 
  @ViewChild(MatTable,{static:true}) table: MatTable<any>;
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
  displayedColumns: string[] = ['Customer','Adviser','Fecha','Nit cliente','Accion'];
  dataTable: TurnsAssignament[] = [];
  dataSource= new MatTableDataSource(this.dataTable);
  hideForm: number;
  hideVisit: number;
  
  constructor( public dialog: MatDialog, private httpClient : HttpClient,  private _snackBar: MatSnackBar, private session: SessionService) { 
    this.hideForm = this.session.getPermission('COMERCIAL',AppSettings.PERMISSION_COMERCIAL.Regis_visitas.index);
    this.hideVisit = this.session.getPermission('COMERCIAL',AppSettings.PERMISSION_COMERCIAL.Download_date.index);
    console.log(this.hideForm);
  }

  ngOnInit(): void {
    this.GetVist();
  }

  Download(){

    const dialogRef = this.dialog.open(DatepickerDialog,{
      width: '900px',
    });
    
    dialogRef.afterClosed().subscribe(result=>{
      this.httpClient.post(`${AppSettings.API_ENDPOINT}/api/Visit`,{datein: formatDate(result.datein, 'yyyy-MM-dd', 'en'), dateout: formatDate(result.dateout, 'yyyy-MM-dd', 'en') }).subscribe(res=>{
        console.log(res);
        new Angular5Csv(res, 'My Report',{headers: ['Fecha','Hora','Usuario','Nit','Nombres','Celular','Mail','Tipo_vehiculo','Asesor','Plan_venta','Retoma','Financiado','Observaciones']});
      })
    })
  }

  NumVisits(){
    const dialogRef = this.dialog.open(VisitsDialog,{
      width: '900px',
    });
    
  }

  GetVist(){
    let user = ['CIALVEH'].find(element=> element == this.session.getGroup());
    user = user != null ? this.session.getUsername() : undefined;
    this.httpClient.post<TurnsAssignament[]>(`${AppSettings.API_ENDPOINT}/api/getvisit`,{user: user}).subscribe(res=>{
      this.dataTable= res;
      this.dataSource = new MatTableDataSource(this.dataTable);
      console.log(res);
    })
  }


  refreshTurns(id: number, cliente: number){
    
    this.Popturns().subscribe(res=>{
      if(res){
        this.httpClient.post(`${AppSettings.API_ENDPOINT}/api/changeTurns`,{idTurn: res.id_turno,idTurnOld: id,nit: cliente}).subscribe(res=>{
          console.log(res);
        })

      }else{
        this._snackBar.open('No hay asesores disponibles','OK',{duration: 1000});
      }
    })
  }

  Popturns(){
    return this.httpClient.get<Turns>(`${AppSettings.API_ENDPOINT}/api/getTurn`);
  }

  openDialog(){
    if( this.visit.valid){   
      const dialogRef = this.dialog.open(DialogContentExampleDialog,{
        width: '900px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        this.Popturns().subscribe(res=>{
          if(res){
            this.httpClient.post(`${AppSettings.API_ENDPOINT}/api/assingTurn`,{ form: result, motive: this.visit.controls['motive'].value, seller: res.usuario_as, nit_seller: res.nit_asesor,idTurn: res.id_turno, user: this.session.getUsername()}).subscribe(res=>{
              console.log(res);
              console.log("termino");
              this.GetVist();
            })
          }else{
            this._snackBar.open('No hay asesores disponibles','OK',{duration: 1000});
          }
          
        })
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
    type_id: new FormControl({value: '',disabled: true} ,Validators.required),
    id: new FormControl('',Validators.compose([Validators.required,Validators.pattern('[0-9]+')])),
    firstName: new FormControl({value: '',disabled: true},Validators.compose([Validators.required,Validators.pattern('[a-zA-Z ]*')]) ),
    lastName: new FormControl({value: '',disabled: true},Validators.compose([Validators.required,Validators.pattern('[a-zA-Z ]*')])),
    cellphone: new FormControl({value: '',disabled: true},Validators.compose([Validators.required,Validators.pattern('[0-9]+')])),
    email: new FormControl({value: '',disabled: true},Validators.compose([Validators.required,Validators.email])),
    obs: new FormControl('',Validators.required),
    vh: new FormControl('',Validators.required),
    use_vh: new FormControl('',Validators.required),
    type_vh: new FormControl('',Validators.required),
    plan_vh: new FormControl('',Validators.required),
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
  existUser: boolean = false;
  constructor(private httpClient : HttpClient, private session: SessionService, private dialogRef: MatDialogRef<DialogContentExampleDialog>, private _snackBar: MatSnackBar ){}

  ngOnInit(): void {
    this.GetVh_interes();
  }

  GetVh_interes(){
    let hearder = new HttpHeaders().set('auth-token',this.session.getCurrentUser().token)
    this.httpClient.get(`${AppSettings.API_ENDPOINT}/api/vh_interes`,{headers: hearder}).subscribe(res=>{
      this.vehicles = res;
    })
  }

  closeDialog(){
    if( this.Form.valid){
      if(!this.existUser){
        let hearder = new HttpHeaders().set('auth-token',this.session.getCurrentUser().token)
        this.httpClient.post<Person>(`${AppSettings.API_ENDPOINT}/api/findPerson`,{value: this.Form.controls['lastName'].value+' '+ this.Form.controls['firstName'].value, param: 1},{headers: hearder}).subscribe(res=>{
          if(!res){
            this.dialogRef.close(this.Form.getRawValue());
          }else{
            this._snackBar.open('Ya existe un tercero con el mismo nombre','OK');
          }
        })
      }else{
        this.dialogRef.close(this.Form.getRawValue());
      }
    }
  }

  FindPerson(){
    let hearder = new HttpHeaders().set('auth-token',this.session.getCurrentUser().token);
    console.log("entro");
    this.httpClient.post<Person>(`${AppSettings.API_ENDPOINT}/api/findPerson`,{value: this.Form.controls['id'].value, param: 0},{headers: hearder}).subscribe(res=>{
      if( res){
        this.existUser=true;
        this.Form.patchValue({
          firstName: res.name,
          lastName: res.lastname,
          cellphone: res.cellphone,
          email: res.mail,
          type_id: res.typeID
        })
      }else{
        this.existUser = false;
        this.Form.controls['firstName'].enable();
        this.Form.controls['lastName'].enable();
        this.Form.controls['cellphone'].enable();
        this.Form.controls['email'].enable();
        this.Form.controls['type_id'].enable();
      }
    })
  }
}



@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.html',
  styleUrls: ['./turns.component.scss']
})
export class DatepickerDialog {
  minDate: Date;
  date: Date;
  Form= new FormGroup({
    datein: new FormControl('' ,Validators.required),
    dateout: new FormControl('',Validators.required)
  });
  constructor(private dialogRef: MatDialogRef<DatepickerDialog>, private _snackBar: MatSnackBar){
    var currentDate= new Date();
    this.date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    this.minDate = new Date(currentDate.getFullYear(), 4, 14);
  }

  closeDialog(){
    if( this.Form.valid && this.Form.controls['dateout'].value >= this.Form.controls['datein'].value){
      this.dialogRef.close(this.Form.getRawValue());
    }else{
      this._snackBar.open('Los valores ingresados son incorrectos','OK');
    }
  }
}


@Component({
  selector: 'visit',
  templateUrl: './visits.html',
  styleUrls: ['./turns.component.scss']
})
export class VisitsDialog {
  displayedColumns: string[] = ['Mes','Dia','Visitas'];
  dataTable: Visits[] = [];
  dataSource= new MatTableDataSource(this.dataTable);
  minDate: Date;
  date: Date;
  Form= new FormGroup({
    datein: new FormControl('' ,Validators.required),
    dateout: new FormControl('',Validators.required)
  });
  constructor(private dialogRef: MatDialogRef<VisitsDialog>, private _snackBar: MatSnackBar, private httpClient : HttpClient){
    var currentDate= new Date();
    this.date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    this.minDate = new Date(currentDate.getFullYear(), 4, 14);
  }

  Submit(){
    if( this.Form.valid){
      this.httpClient.post<Visits[]>(`${AppSettings.API_ENDPOINT}/api/Visitnum`,{datein: this.Form.controls['datein'].value, dateout: this.Form.controls['dateout'].value}).subscribe(res=>{
        this.dataTable = res;
        console.log(this.dataTable);
        if( this.dataTable.length==0){
          this._snackBar.open('No hay informacion en esta fecha');
        }else{
          this.dataSource = new MatTableDataSource(this.dataTable);
        }
      })
    }
  }
  
}