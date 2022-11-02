import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seleccionar-parada',
  templateUrl: './seleccionar-parada.component.html',
  styleUrls: ['./seleccionar-parada.component.css']
})
export class SeleccionarParadaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SeleccionarParadaComponent>, private router:Router, @Inject(MAT_DIALOG_DATA) public paradas:any){  
  }

  ngOnInit(): void {
  }

  formGroup: FormGroup= new FormGroup({
    parada: new FormControl('', Validators.required),
  }); 
  
  onNoClick(){
    this.dialogRef.close();
  }

  onClick(){
    localStorage.clear();
    this.dialogRef.close();
    this.router.navigate(["/"]);
    window.location.reload();
  }

  settings(){
    this.dialogRef.close();
    this.router.navigate(["/configuracion"]);
  }

  submit(){
    this.dialogRef.close(this.formGroup.value.parada);
  }
}
