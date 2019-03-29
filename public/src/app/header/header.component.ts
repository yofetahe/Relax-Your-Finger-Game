import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InfoServiceService } from '../service/info-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  current_user = sessionStorage.getItem('email')
  active_user: boolean;
  inactive_user: boolean;
  connected_number: string;

  getNumberOfConnected: Observable<string>;

  constructor(
    private _router: Router,
    private _infoService: InfoServiceService
  ) { }

  ngOnInit() {
    this.active_user = false;
    this.inactive_user = true;
    this.getNumberOfConnected = this._infoService.connected_user_number;

    this.getNumberOfConnected.subscribe(data => {
      this.connected_number = data;
    });

    if(this.current_user){
      this.active_user = true;
      this.inactive_user = false;
    }
  }



  logout(){
    this.active_user = false;
    this.inactive_user = true;
    sessionStorage.removeItem('email');
    this._router.navigate(['']);
  }

}
