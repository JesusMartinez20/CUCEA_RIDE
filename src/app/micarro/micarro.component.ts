import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-micarro',
  templateUrl: './micarro.component.html',
  styleUrls: ['./micarro.component.css']
})
export class MicarroComponent implements OnInit {

  constructor(private service:RequestService, private router:Router,public dialog: MatDialog, private deviceService: DeviceDetectorService) { }
  coche=false;
  cocheDatos:any=[];

  ngOnInit(): void {
    this.service.getPosts("/getCarro.php?token="+localStorage.getItem('token')).subscribe(data => {
      let response:any=data
      console.log(response)
      if(response==null){
        this.coche=false;
      }else{
        this.coche=true
        this.cocheDatos=response[0];
      }
    })
  }

  nav(pestana:string){
    this.router.navigate([pestana])
  }

}
