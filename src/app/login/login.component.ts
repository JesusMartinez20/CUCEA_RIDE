import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl  } from '@angular/forms';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url="login"
  primer_login:any
  message=null;

  formGroup: FormGroup= new FormGroup({
    matricula: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', Validators.required)
  }); 

  constructor(private service:RequestService, private router:Router, private snackbar:MatSnackBar) { 
  }

  ngOnInit(): void {
    let token=localStorage.getItem('token')
    if(token!=null){
      this.router.navigate(["home"]);
    }
  }

  submit(){
    let data=(this.formGroup.value)
    
    this.service.login(data.matricula,data.contrasena).subscribe(data => {
      let response:any=data
      if(response.token!=undefined){
        localStorage.setItem('token',response.token)
        localStorage.setItem('username',response.username)
        window.location.reload();
        this.router.navigate(["home"]);//catalogo
      }else{
        this.snackbar.open("Registo o contraseña incorrectos","Ok",{duration:2000});
      }
    });
  }
}
