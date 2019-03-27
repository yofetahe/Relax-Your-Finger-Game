import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {
    email: '',
    password: ''
  }

  error: string;

  constructor(
    private _http: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    
  }

  login(){
    this._http.getUserByUsername(this.user)
      .subscribe(data => {
        console.log(data['name'])
        if(data){
          sessionStorage.setItem('name', data['name']);
          sessionStorage.setItem('email', data['email']);        
          this._router.navigate(['']);
        } else {
          this.error = "Invalid username or password."
        }
      })
  }

}
