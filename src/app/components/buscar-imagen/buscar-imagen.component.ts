import { Component, OnInit } from '@angular/core';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent implements OnInit {

  nameImage:string;

  constructor(private _imagenService: ImagenService) { 
    this.nameImage='';
  }

  ngOnInit(): void {
  }

  SearchImages():void{
    if (this.nameImage === ''){
      this._imagenService.setError('Add a text to search');
      return;
    }

    this._imagenService.sendText2Search(this.nameImage);
  }

}
