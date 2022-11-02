import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OfrecerRideComponent } from '../ofrecer-ride/ofrecer-ride.component';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-mis-rides',
  templateUrl: './mis-rides.component.html',
  styleUrls: ['./mis-rides.component.css']
})
export class MisRidesComponent implements OnInit {

  constructor(private service:RequestService, private router:Router,public dialog: MatDialog,private snackbar:MatSnackBar) { }
  ridesSolicitados:any;
  ridesOfrecidos:any;
  ngOnInit(): void {
    this.service.getPosts("/getRidesSolicitados.php?token="+localStorage.getItem('token')).subscribe(data=>{
      console.log(data)
      this.ridesSolicitados=data;
    });
    this.service.getPosts("/getRidesOfrecidos.php?token="+localStorage.getItem('token')).subscribe(data=>{
      console.log(data)
      this.ridesOfrecidos=data;
    });
  }

  ofrecer(){
    this.service.getPosts("/disponibilidadRideConductor.php?token="+localStorage.getItem('token')).subscribe(data=>{
      let response:any=data;
      if(response!="OK"){
        this.snackbar.open(response,"Ok",{duration:2000});
      }else{
        this.openDialog();
      }
    })
  }

  verRide(id:number){
    this.router.navigate(['ride']);
  }

  openDialog() {
    this.router.navigate(["ofrecerRide"])
  }
}

