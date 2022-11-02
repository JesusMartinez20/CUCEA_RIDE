import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service:RequestService, private router:Router,public dialog: MatDialog,private snackbar:MatSnackBar) { }

  rides:any;
  ridesToCucea:any=[];
  ridesFromCucea:any=[];
  
  ngOnInit(): void {
    this.service.getPosts("/getRides.php?token="+localStorage.getItem('token')).subscribe(data=>{
      console.log(data)
      this.rides=data;
      for (let i = 0; i < this.rides.length; i++) {
        if(!this.rides){
          this.ridesFromCucea.push(this.rides[i]);
        }else{
          this.ridesToCucea.push(this.rides[i]);
        }
      }
      console.log(this.ridesFromCucea.length)
    });
  }

  verRide(id:number){
    this.router.navigate(['ride']);
  }

}
