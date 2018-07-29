import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { Router } from '@angular/router'
import { NgZone } from '@angular/core'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private authService: AuthService, private router : Router,private zone: NgZone) { 
    
  }
  signInWithGoogle() {
    this.authService.signInWithGoogle().then((res)=>{
      // Once signed in navigate to dashboard
      this.zone.run(()=>{
        this.router.navigate(['dashboard'])
      })
      
    }).catch((err)=>console.log(err));
  }
  ngOnInit() {
    // automatically sign in with google
    this.signInWithGoogle()
  }


}
