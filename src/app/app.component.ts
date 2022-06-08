import { Component } from '@angular/core';
import { BnNgIdleService } from 'bn-ng-idle'; 
import { Router } from '@angular/router';
import {SessionService} from '../app/Service/Session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dashboard';
  GroupTimeout: Array<String> = ['ANFITRIONA','COORCIAL','DMS']
  constructor(private bnIdle: BnNgIdleService, private router: Router, private session: SessionService) {  }

  ngOnInit(): void {
    this.bnIdle.startWatching(300).subscribe( isTimedOut => {
      if (isTimedOut && this.GroupTimeout.indexOf(this.session.getGroup())== -1 ) {
        this.session.Logout();
        this.router.navigate(['/login']);
        window.location.reload();
      }
    });
  }
}
