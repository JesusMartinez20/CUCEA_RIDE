import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl  } from '@angular/forms';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formGroup: FormGroup= new FormGroup({
    matricula: new FormControl('', [Validators.required]),
    contrasena: new FormControl('', Validators.required),
    confirm_contrasena: new FormControl('', Validators.required),
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required)
  }); 

  hide=true;  

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
    this.service.postMethod("/registro.php",data).subscribe(data => {
      let response:any=data
      if(response.token!=undefined){
        localStorage.setItem('token',response.token)
        localStorage.setItem('username',response.username)
        this.snackbar.open("Cuenta creada","Ok",{duration:2000});
        window.location.reload();
        this.router.navigate(["home"]);//catalogo
      }else{
        this.snackbar.open(response,"Ok",{duration:2000});
      }
    });
  }

}
