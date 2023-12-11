import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class TiendaServicesService {

  rutaJsonGetAll = `${environment.apiURL}/productos`
  rutaJsonGetOne = `${environment.apiURL}/productos/`
  rutaJsonGetCarrito = `${environment.apiURL}/carrito`
  constructor(private http: HttpClient) { }


  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.rutaJsonGetAll);
  }

  getOne(idRecibida : number) : Observable<Producto>{
    console.log((`${this.rutaJsonGetOne}idRecibida`));
    return this.http.get<Producto>(this.rutaJsonGetOne + idRecibida);
  }
}
