import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit,Inject } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {io, Socket} from 'socket.io-client';
import { AppSettings } from '../../Config/constants'
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Howl} from 'howler';
import { SessionService } from '../../Service/Session/session.service';


export interface Turns {
  name: string;
  state: string,
  descripcion: string,
  cliente: string
}

@Component({
  selector: 'app-view-turns',
  templateUrl: './view-turns.component.html',
  styleUrls: ['./view-turns.component.scss']
})
export class ViewTurnsComponent implements OnInit {
  displayedColumns: string[] = ['Estado turno','Asesor','Cliente'];
  dataTable: Turns[] = [];
  dataSource= new MatTableDataSource(this.dataTable);
  socket: Socket;

  constructor( public dialog: MatDialog, private session: SessionService) {
    this.socket = this.session.getSocket();
    this.getTurns(); 
  }

  ngOnInit(): void {

  }

  getTurns(){
    this.socket.connect();
    this.socket.on('refreshTurns',(arg) =>{
      console.log(JSON.parse(arg.turns));
      this.dataTable= JSON.parse(arg.turns);
      this.dataSource = new MatTableDataSource(this.dataTable);
    })

    this.socket.on('notification',(arg)=>{
      const dialogRef = this.dialog.open(NotificationDialog,{
        data:{
          name: arg.name+' ES SOLICITADO EN RECEPCION'
        },
        width: '900px',
        panelClass: 'custom-modalbox'
      });
    })
  }

}

@Component({
  selector: 'notification-dialog',
  templateUrl: './notification-dialog.html',
  styleUrls: ['./view-turns.component.scss']
})

export class NotificationDialog {
  name: string = '';
  sound = new Howl({ src: ['assets/Notifications.mp3'], loop: true });
  constructor( private dialogRef: MatDialogRef<NotificationDialog>, @Inject(MAT_DIALOG_DATA) data: { name: string }){ 
    this.name = data ? data.name : '';
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.sound.stop();
      this.dialogRef.close();
    }, 10000);

    if( this.name){
      this.sound.play();
    }
  }


  closeDialog(){
    this.sound.stop();
    this.dialogRef.close();
  }


}
