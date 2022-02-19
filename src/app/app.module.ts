import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatCardModule} from '@angular/material/card'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TurnsComponent } from './Components/turns/turns.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { LoginTurnsComponent } from './Components/login-turns/login-turns.component';
import {MatTableModule} from '@angular/material/table'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {DialogContentExampleDialog} from './Components/turns/turns.component';

@NgModule({
  declarations: [
    AppComponent,
    TurnsComponent,
    LoginTurnsComponent,
    DialogContentExampleDialog
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
