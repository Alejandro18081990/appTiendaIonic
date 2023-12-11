import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { TiendaServicesService } from '../services/tienda-services.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  idRecibida: number;
  productoRecibido!: Producto;

  constructor(private servicio: TiendaServicesService, private router: ActivatedRoute, private toast: ToastController, private servicioCarrito: CarritoService, private loadingCtrl: LoadingController) {
    this.idRecibida = 0;
  }

  ngOnInit() {
    this.getOne();
  }

  getOne() {
    this.router.params.subscribe((params) => { this.idRecibida = params['id'] });
    this.servicio.getOne(this.idRecibida).subscribe(respuesta => { this.productoRecibido = respuesta });
  }

  async anadirCarrito() {
    if (this.productoRecibido == null)
      this.presentToast('bottom', "El producto no ha podido ser añadido ... Revise")
    else {
      const loading = await this.loadingCtrl.create({ message: "Cargando espero por favor...", duration: 6000 });
      loading.present();
      this.servicioCarrito.addProducto(this.productoRecibido).subscribe(() => {
        this.presentToast('bottom', "Producto añadido con exito")
        loading.dismiss();
      });
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 600,
      position: position,
    });


    await toast.present();
  }


}
