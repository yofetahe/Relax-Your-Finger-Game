import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  user: any = {
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  }

  user_reg: any = {
    name: '',
    email: '',
    password: ''
  }

  errors: any = {
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  }

  EMAIL_REGEXP  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  error: string;

  constructor(
    private _httpSevice: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  register_user(){

    console.log(this.user);

    if(this.user.password != this.user.confirm_password){
      this.errors.password = 'The password doesnt match';
    } else if(!this.EMAIL_REGEXP.test(String(this.user.email).toLowerCase())) {
      this.errors.email = "Please provide valid email address";      
    } else {
      
      this.user_reg.name = this.user.name;
      this.user_reg.email = this.user.email;
      this.user_reg.password = this.user.password;

      this._httpSevice.addUser(this.user_reg)
        .subscribe((data) => {
          if(data){
            sessionStorage.setItem('name', data['name']);
            sessionStorage.setItem('email', data['email']);        
            this._router.navigate(['']);
          } else {
            this.error = "Sorry try again.";
          }          
        })
    }
  }
}
