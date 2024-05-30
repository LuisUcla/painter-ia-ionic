import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { Platform } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent  implements OnInit {

  @Input() post: Post;
  @Input() isNew: boolean;

  selectedImage: string = '';

  constructor(
    public platform: Platform, 
    private utilsService: UtilsService,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.selectedImage = this.post.images[0];
  }

  async submit() {
    let userPosts: Post[] = this.utilsService.getElementFromLocalstorage('userPosts') || [];
    const loading = await this.utilsService.presentLoading({ message: 'Publicando...' })

    this.postsService.createPosts(this.post).subscribe({
      next: (response: any) => {
        userPosts.push(response.post);
        this.utilsService.setElementInLocalstorage('userPosts', userPosts);
        this.utilsService.routerLink('/home');
        this.utilsService.dismissModal();
        loading.dismiss();
      }, error: () => {
        this.utilsService.presetToast({
          message: 'Ocurrio un error...',
          duration: 1500,
          color: 'danger',
          icon: 'alert-circle-outline'
        })
        loading.dismiss();
      }
    })
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
      this.utilsService.shareImageInMobile(this.selectedImage)
    } else {
      // guardar
      this.utilsService.saveImageInWeb(this.selectedImage)
    }
  }

}
