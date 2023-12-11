import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  productosCarrito!: Producto[]
  precio: number;

  constructor(private route: ActivatedRoute, private servicioCarrito: CarritoService, private alertController: AlertController, private toast: ToastController, private loadingCtrl: LoadingController) {
    this.precio = 0;
  }

  ngOnInit() {
    this.getProductosCarrito();
  }

  getProductosCarrito() {
    this.servicioCarrito.getCarrito().subscribe(respuesta => {
      this.productosCarrito = respuesta
      this.calcularTotal();
    });
  }

  calcularTotal() {
    this.precio = 0;
    for (let producto of this.productosCarrito)
      this.precio += producto.precio
  }

  borrarProducto(idProducto: number) {
    this.servicioCarrito.deleteProducto(idProducto).subscribe(respuesta => {
      this.getProductosCarrito();
    });
  }

  async confirmarCompra() {
    if (this.productosCarrito.length > 0) {
      const loading = await this.loadingCtrl.create({ message: "Cargando espero por favor...", duration: 6000 });
      loading.present();
      for (let producto of this.productosCarrito)
        this.servicioCarrito.deleteProducto(producto.id).subscribe(respuesta => {
          this.presentToast('bottom', "Su compra ha sido realizada ... Gracias");
          this.getProductosCarrito();
          loading.dismiss();
        });
    }
  }

  async confirmarBorrado(producto: Producto, idRecibida: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar borrado',
      message: `¿Estás seguro de que deseas borrar ${producto.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Borrar',
          handler: () => {
            this.borrarProducto(idRecibida);
          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 4000,
      position: position,
    });


    await toast.present();
  }

}
