import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-registro-carro',
  templateUrl: './registro-carro.component.html',
  styleUrls: ['./registro-carro.component.css']
})
export class RegistroCarroComponent implements OnInit {

  formGroup: FormGroup= new FormGroup({
    placas: new FormControl('', [Validators.required]),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required)
  }); 

  constructor(private service:RequestService, private router:Router, private snackbar:MatSnackBar) {}

  ngOnInit(): void {
  }

  submit(){
    let data=(this.formGroup.value)
    this.service.postMethod("/registroCoche.php",data).subscribe(data => {
      let response:any=data
      if(response=="¡El carro ha sido agregado!"){
        this.snackbar.open(response,"Ok",{duration:2000});
        this.router.navigate(["miCarro"]);
      }else{
        this.snackbar.open(response,"Ok",{duration:2000});
      }
    });
  }


}
