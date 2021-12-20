import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  text:string;
  show:boolean;
  subscription: Subscription;

  constructor(private _imagenService: ImagenService) { 
    this.text='';
    this.show=false;
    this.subscription= this._imagenService.getError().subscribe(data =>{
      this.showMessage();
      this.text=data;
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  showMessage():void{
    this.show=true;
    setTimeout(
      ()=>{
        this.show=false;
      },2000
    )
  }

}
