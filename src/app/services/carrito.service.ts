import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  rutaAddJson = `${environment.apiURL}/carrito`
  rutaDeleteProducto = `${environment.apiURL}/carrito/`
  rutaDeleteAllProductos = `${environment.apiURL}/carrito/`

  productosCarrito! : Producto[]
  constructor(private http: HttpClient) { }

  addProducto(productoAnadido: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.rutaAddJson, productoAnadido);
  }

  getCarrito(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.rutaAddJson)
  }

  deleteProducto(idRecibida : number) : Observable<Producto>{
    return this.http.delete<Producto>(this.rutaDeleteProducto + idRecibida);
  }
}
