import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class FireBaseServiceService {

  constructor(private firestore: AngularFirestore) { }

  getAll(): Observable<Producto[]> {
    console.log("llamando a firebase")
    return this.firestore.collection<Producto>('productosCatalogo').valueChanges();
  }
}
