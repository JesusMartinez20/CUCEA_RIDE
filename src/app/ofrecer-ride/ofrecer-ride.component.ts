import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-ofrecer-ride',
  templateUrl: './ofrecer-ride.component.html',
  styleUrls: ['./ofrecer-ride.component.css']
})
export class OfrecerRideComponent implements OnInit {

  
  
separatorKeysCodes: number[] = [ENTER, COMMA];
fruitCtrl = new FormControl('');
filteredFruits: Observable<string[]>;
fruits: string[] = [];
allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];


  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;

constructor(private service:RequestService, private router:Router, private snackbar:MatSnackBar){
  this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
  startWith(null),
  map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),);
}

@ViewChild('picker') picker: any;  

  loading=false;
  iDate:Date=new Date;
  fDate:Date=new Date;
  flujo=false;

  ngOnInit(): void {
  }


add(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();

  // Add our fruit
  if (value) {
    this.fruits.push(value);
  }

  // Clear the input value
  event.chipInput!.clear();

  this.fruitCtrl.setValue(null);
}

remove(fruit: string): void {
  const index = this.fruits.indexOf(fruit);

  if (index >= 0) {
    this.fruits.splice(index, 1);
  }
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.fruits.push(event.option.viewValue);
  this.fruitInput.nativeElement.value = '';
  this.fruitCtrl.setValue(null);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
}
  
  formGroup: FormGroup= new FormGroup({
    hora_salida: new FormControl('', Validators.required),
    sentido: new FormControl('', Validators.required),
    espacios: new FormControl('', Validators.required),
    lugar_salida: new FormControl('', Validators.required)
  }); 

  
  submit(){
    this.loading=true;
    let data=(this.formGroup.value)
    let initialDate=data.hora_salida
    
    if(initialDate!=null){
      this.iDate=initialDate;
      initialDate=initialDate.toLocaleString();
    }
    
    if(data.hora_salida<=Date.now()&&initialDate!=null){
      this.snackbar.open("Hora de salida invalida","Ok",{duration:2000});
      this.loading=false;
    }else{
      data.paradas=this.fruits;
      data.hora_salida=initialDate
      console.log(JSON.stringify(data))
  
      this.service.postMethod("/ofrecerRide.php",data).subscribe(data => {
        let response:any=data
        if(response=="¡El ride ha sido agregado!"){
          this.snackbar.open(response,"Ok",{duration:2000});
          this.router.navigate(["misRides"]);
        }else{
          this.snackbar.open(response,"Ok",{duration:2000});
        }
      });
    }

   
  }

  dateUpdated(){}

  update(){
    
  }
}
