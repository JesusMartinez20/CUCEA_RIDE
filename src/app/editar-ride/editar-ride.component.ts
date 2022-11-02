import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, startWith } from 'rxjs';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-editar-ride',
  templateUrl: './editar-ride.component.html',
  styleUrls: ['./editar-ride.component.css']
})
export class EditarRideComponent implements OnInit {

  
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = [];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  
  
    @ViewChild('fruitInput')
    fruitInput!: ElementRef<HTMLInputElement>;
  
  constructor(private service:RequestService, private router:Router, private snackbar:MatSnackBar,public route:ActivatedRoute){
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    startWith(null),
    map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),);
  }
  
  @ViewChild('picker') picker: any;  
  
    loading=false;
    iDate:Date=new Date;
    fDate:Date=new Date;
    flujo=false;
  
    solicitud:any=[];

    ride:any=[];
    id=null;
    paradas:any=[];
    cancelar=false;
    conductor=false;
    hora:any;

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id=params['id']
    });
      
    this.service.getPosts("/getRide.php?id="+this.id+"&token="+localStorage.getItem('token')).subscribe(data => {
      let response:any=data
      console.log(response)
      this.ride=response[0][0];
      this.solicitud=response[2];
      if(this.solicitud.length!=0){
        this.cancelar=true
      }
      response[1].forEach((element:any, i:any)  => {
        this.fruits[i]=element.lugar
      });
      this.conductor=response[3]
      this.hora=new Date(this.ride.hora_salida);

      this.formGroup.setValue({
        hora_salida:this.hora,
        sentido:this.ride.sentido,
        espacios:this.ride.espacios,
        lugar_salida:this.ride.lugar_salida
      })
      console.log(response[1])
    })
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
      
      console.log(data.hora_salida)
      if(initialDate!=null){
        initialDate=initialDate.toLocaleString();
      }
      console.log(data.hora_salida)
      
      if(data.hora_salida<=Date.now()&&initialDate!=null){
        this.snackbar.open("Hora de salida invalida","Ok",{duration:2000});
        this.loading=false;
      }else{
        data.paradas=this.fruits;
        data.id=this.id;
        data.hora_salida=initialDate
        console.log(JSON.stringify(data))
    
        this.service.postMethod("/editarRide.php",data).subscribe(data => {
          let response:any=data
          if(response=="¡El ride ha sido modificado!"){
            this.snackbar.open(response,"Ok",{duration:2000});
            //this.router.navigate(["misRides"]);
          }else{
            console.log(response)
            this.snackbar.open(response,"Ok",{duration:2000});
          }
        });
      }
    }
  
    eliminarRide(){
      let data={id:this.id};
      this.service.postMethod("/eliminarRide.php",data).subscribe(data => {
        let response:any=data
        if(response=="¡El ride ha sido eliminado!"){
          this.snackbar.open(response,"Ok",{duration:2000});
          this.router.navigate(["misRides"]);
        }else{
          console.log(response)
          this.snackbar.open(response,"Ok",{duration:2000});
        }
      });
    }

    dateUpdated(){

    }
  }
  