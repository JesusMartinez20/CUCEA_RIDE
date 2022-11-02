import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl  } from '@angular/forms';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  url="login"
  primer_login:any
  message=null;

  formGroup: FormGroup= new FormGroup({
    id: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', Validators.required)
  }); 

  constructor(private service:RequestService, private router:Router, private snackbar:MatSnackBar) { 
  }

  ngOnInit(): void {
  }

  submit(){
    let data=(this.formGroup.value)
    
    this.service.login(data.id,data.contrasena).subscribe(data => {
      let response:any
      response=data
      if(response.token!=undefined){
        localStorage.setItem('token',response.token)
        localStorage.setItem('tipo_cuenta',response.tipo_cuenta)
        localStorage.setItem('username',response.username)
        this.primer_login=true
        window.location.reload();
        this.router.navigate(["dispositivos"]);//catalogo
      }else{
        this.snackbar.open("Registo o contraseña incorrectos","Ok",{duration:2000});
      }
    });
  }
}
