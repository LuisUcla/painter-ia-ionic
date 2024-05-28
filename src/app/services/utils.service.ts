import { Injectable } from '@angular/core';
import { LoadingController, LoadingOptions, ModalController, ModalOptions, ToastController, ToastOptions } from '@ionic/angular';
import { Clipboard } from '@capacitor/clipboard';
import * as fs from 'file-saver'; // para guardar archivos en web
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) { }

  routerLink(url: string) {
    this.router.navigateByUrl(url);
  }

  setElementInLocalstorage(key: string, element: any) {
    return localStorage.setItem(key, JSON.stringify(element))
  }

  getElementFromLocalstorage(key: string) {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  async presentLoading(opts?: LoadingOptions): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingCtrl.create(opts);
    await loading.present();
    return loading;
  }

  async dismissLoading() {
    return await this.loadingCtrl.dismiss();
  }

  async presentModal(modalOptions: ModalOptions) {
    const modal = await this.modalCtrl.create(modalOptions);
    return await modal.present();
  }

  async dismissModal() {
    return await this.modalCtrl.dismiss();
  }

  async copyToClipboard(string: string) {
    return await Clipboard.write({string})
  }

  async presetToast(opts: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  saveImageInWeb(url: string) { // comparte cuando es web
    return fs.saveAs(url, `${Date.now()}.jpg`) // nombre de la imagen es la fecha actual
  }

  async shareImageInMobile(url: string) {
    let base64: string;
    let path = `${Date.now()}.jpg`;

    this.presentLoading();
    if (url.includes('https')) {
      base64 = await this.convertUrlToBase64(url) as string;
    } else {
      base64 = url;
    }

    await Filesystem.writeFile({
      path,
      data: base64,
      directory: Directory.Cache
    }).then(async (res) => {
      this.dismissLoading();
      await Share.share({ url: res.uri }).then(() => {
        this.presetToast({
          message: '',
          color: 'primary',
          icon: 'share-social-outline',
          duration: 1000
        })
      });

      await Filesystem.deleteFile({
        path,
        directory: Directory.Cache
      })
    })
  }

   async convertUrlToBase64(url: string) {
    let response = await fetch(url);
    let blob = await response.blob();

    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };

      reader.readAsDataURL(blob);
    })
  }
}
