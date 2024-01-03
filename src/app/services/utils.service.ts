import { Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private modalCtrl: ModalController
  ) { }

  async presentModal(modalOptions: ModalOptions) {
    const modal = await this.modalCtrl.create(modalOptions);
    modal.present();
  }

  async dismiss() {
    return await this.modalCtrl.dismiss();
  }
}
