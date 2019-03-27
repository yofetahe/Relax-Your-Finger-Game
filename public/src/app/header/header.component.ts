import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  current_user = sessionStorage.getItem('email')
  active_user: boolean;
  inactive_user: boolean;  

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    this.active_user = false;
    this.inactive_user = true;
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
