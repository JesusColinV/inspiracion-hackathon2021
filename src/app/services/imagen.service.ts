import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  private error$= new Subject<string>();
  private text2Search$ = new Subject<string>();

  constructor(private http:HttpClient) { }

  setError(mensaje:string){
    this.error$.next(mensaje);
  }

  getError():Observable<string>{
    return this.error$.asObservable();
  }

  sendText2Search(text:string){
    this.text2Search$.next(text);
  }

  getText2Search():Observable<string>{
  return this.text2Search$.asObservable();
  }

  getImages(text:string,total:number,now:number):Observable<any>{
    const KEY='24243644-2cfc8c0a69a42b608de82e118';
    const URL='https://pixabay.com/api/?key='+ KEY +'&q='+text+'&per_page='+total+'&page='+now;
    console.log(URL)
    return this.http.get(URL);
  }
}
