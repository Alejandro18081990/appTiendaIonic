import { Component, OnInit } from '@angular/core';
import { TiendaServicesService } from '../services/tienda-services.service';
import { Producto } from '../interfaces/producto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  listaProductos!: Producto[];
  constructor(private productosService: TiendaServicesService) {

  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.productosService.getAll().subscribe(respuesta => {
      this.listaProductos = respuesta

    });
  }

}
