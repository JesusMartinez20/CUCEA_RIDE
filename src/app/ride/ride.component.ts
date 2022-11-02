import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../request.service';
import { SeleccionarParadaComponent } from '../seleccionar-parada/seleccionar-parada.component';

@Component({
  selector: 'app-ride',
  templateUrl: './ride.component.html',
  styleUrls: ['./ride.component.css']
})
export class RideComponent implements OnInit {

  constructor(private service:RequestService, private router:Router,public dialog: MatDialog, public route:ActivatedRoute, private snackbar:MatSnackBar) { }
  ride:any=[];
  id=null;
  paradas:any=[];
  loading=false;
  solicitud:any=[];
  cancelar=false;
  conductor=false;
  solicitudes:any=[];

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.id=params['id']
    });
      
    this.service.getPosts("/getRide.php?id="+this.id+"&token="+localStorage.getItem('token')).subscribe(data => {
      let response:any=data
      console.log(response)
      this.ride=response[0][0];
      this.paradas=response[1];
      this.solicitud=response[2];
      if(this.solicitud.length!=0){
        this.cancelar=true
      }
      this.conductor=response[3]
      this.solicitudes=response[4]
      console.log(response[1])
    })
  }

  nav(pestana:string){
    this.router.navigate([pestana])
  }

  solicitarRide(){
    this.loading=true;

    if(this.paradas.length>0){
      const dialogRef = this.dialog.open(SeleccionarParadaComponent,{data:this.paradas});

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        if(result!=""){
          this.Solicitar(result);
        }else{
          this.snackbar.open("Selecciona una parada","OK",{duration:2000});
        }
        
      });
    }else{
      this.Solicitar(null)
    }
    

    /**/
    this.loading=false;
  }

  Solicitar(id:any){
    let data={id_ride:this.id,id_parada:id}
    this.service.postMethod("/solicitarRide.php",data).subscribe(data=>{
      let res:any=data
      console.log(res)
      if(res=="¡El ride ha sido agregado!"){
        this.snackbar.open(res,"OK",{duration:2000});
        this.router.navigate(['misRides']);
      }else{
        this.snackbar.open(res,"OK",{duration:2000});
      }
      this.loading=false;
    })
  }

  cancelarRide(){
    let data={id_ride:this.id,id:this.solicitud[0].id}
    this.loading=true;
    console.log(JSON.stringify(data))
    this.service.postMethod("/cancelarRide.php",data).subscribe(data=>{
      let res:any=data
      console.log(res)
      if(res=="¡La solicitud ha sido cancelada!"){
        this.snackbar.open(res,"OK",{duration:2000});
        this.router.navigate(['home']);
      }else{
        this.snackbar.open(res,"OK",{duration:2000});
      }
      this.loading=false;
    })
    this.loading=false;
  }

  editarRide(){
    this.router.navigate(['editarRide',this.id]);
  }

}
