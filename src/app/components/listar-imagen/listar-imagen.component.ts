import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent implements OnInit {

  text:string;
  subscription: Subscription;
  listImages: any[]=[];
  loading:boolean;
  imagebypage:number;
  mypage:number;
  totalPages:number;

  constructor(private _imagenService: ImagenService) { 
    this.text='';
    this.loading=false;
    this.imagebypage=28;
    this.totalPages=0;
    this.mypage=1;
    this.subscription= _imagenService.getText2Search().subscribe(data => {
      this.mypage=1;
      this.loading=true;
      this.text=data;
      this.getImages();
    })
  }

  ngOnInit(): void {
  }

  getImages(){
    this._imagenService.getImages(this.text,this.imagebypage,this.mypage).subscribe(data=>{
      this.loading=false;
      if (data.hits.length === 0){
        this._imagenService.setError('there is no result');
        return;
      }
      console.log(data.TotalHits);
      console.log(Math.ceil(data.totalHits/this.imagebypage));
      this.totalPages = Math.ceil(data.totalHits/this.imagebypage);
      this.listImages = data.hits;
    },error =>{
      this._imagenService.setError('an error occurred');
      this.loading=false;
    })
  }

  lastpage(){
    this.mypage--;
    this.loading=true;
    this.listImages=[];
    this.getImages();
  }

  nextpage(){
    this.mypage++;
    this.loading=true;
    this.listImages=[];
    this.getImages();
  }

  viewlast(){
    if(this.mypage>1){
      return true;
    }else{
      return false;
    }
  }

  viewnext(){
    if(this.mypage< this.totalPages){
      return true;
    }else{
      return false;
    }
  }

}
