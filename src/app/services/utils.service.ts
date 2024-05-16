import { Injectable } from '@angular/core';
import { ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';
import * as fs from 'file-saver'; // para guardar archivos en web

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { }

  async presentModal(modalOptions: ModalOptions) {
    const modal = await this.modalCtrl.create(modalOptions);
    modal.present();
  }

  async dismiss() {
    return await this.modalCtrl.dismiss();
  }

  async copyToClipboard(string: string) {
    return await Clipboard.write({string})
  }

  async presetToast(opts: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  saveImageInWeb(url: string) {
    return fs.saveAs(url, `${Date.now()}.jpg`) // nombre de la imagen es la fecha actual
  }
}
