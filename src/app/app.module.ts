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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {DialogContentExampleDialog, VisitsDialog} from './Components/turns/turns.component';
import {NotificationDialog} from './Components/view-turns/view-turns.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon'; 
import {MatGridListModule} from '@angular/material/grid-list';
import { ViewTurnsComponent } from './Components/view-turns/view-turns.component'; 
import {MatListModule} from '@angular/material/list'; 
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'; 
import { CookieService } from 'ngx-cookie-service';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion'; 
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { SessionService} from './Service/Session/session.service'
import { BnNgIdleService } from 'bn-ng-idle'; 
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DatepickerDialog} from './Components/turns/turns.component';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    TurnsComponent,
    DialogContentExampleDialog,
    VisitsDialog,
    DatepickerDialog,
    NotificationDialog,
    ViewTurnsComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatExpansionModule,
    AppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatBadgeModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule,
    BrowserAnimationsModule,

  ],
  providers: [CookieService,SessionService,BnNgIdleService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
