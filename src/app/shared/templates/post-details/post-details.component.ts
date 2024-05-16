import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { Platform } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent  implements OnInit {

  @Input() post: Post;
  @Input() isNew: boolean;

  selectedImage: string = '';

  constructor(public platform: Platform, private utilsService: UtilsService) { }

  ngOnInit() {
    this.selectedImage = this.post.images[0];
  }

  copyPromptToClipboard() {
    this.utilsService.copyToClipboard(this.post.prompt);
    this.utilsService.presetToast({
      message: "Copiado al porta papeles...",
      icon: 'clipboard-outline',
      duration: 1000,
      color: 'primary'
    })
  }

  saveImage() {
    if (this.platform.is('capacitor')) {
      // compartir
    } else {
      // guardar
      this.utilsService.saveImageInWeb(this.selectedImage)
    }
  }

}
