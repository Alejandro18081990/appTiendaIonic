import { Component, OnInit } from '@angular/core';
import { TiendaServicesService } from '../services/tienda-services.service';
import { Producto } from '../interfaces/producto';
import { FireBaseServiceService } from '../services/fire-base-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listaProductos!: Producto[];
  
  constructor(private productosService: TiendaServicesService, private firebase : FireBaseServiceService) {

  }

  ngOnInit(): void {
    //this.getAll();
    this.getAllFB();

  }

  getAllFB(){
    this.firebase.getAll().subscribe((s) => {
      this.listaProductos = s;
    })
  }


  getAll() {
    this.productosService.getAll().subscribe(respuesta => {
      this.listaProductos = respuesta

    });
  }

}
