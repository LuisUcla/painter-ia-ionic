import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { surpriseMePrompts } from '../../../assets/data/surprise-promts';
import { Post } from '../../models/post.model';
import { Posts } from '../../../assets/data/images';
import { UtilsService } from '../../services/utils.service';
import { PostDetailsComponent } from '../../shared/templates/post-details/post-details.component';
import { ImageaiService } from 'src/app/services/imageai.service';

@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.page.html',
  styleUrls: ['./create-image.page.scss'],
})
export class CreateImagePage implements OnInit {

  form: FormGroup;
  userPosts: Post[] = []

  constructor(private builder: FormBuilder, private utilsService: UtilsService, private imageAiService: ImageaiService) { 
    this.form = this.builder.group({
      name: ['Luis Fernando', Validators.required],
      prompt: ['', Validators.required]
    })
  }

  

  ngOnInit() {
    this.getUserPosts();
  }

  getUserPosts() {
    return this.userPosts = this.utilsService.getElementFromLocalstorage('userPosts') || [];
  }

  async submit() {
    this.utilsService.presentLoading({ message: 'Generando Imagenes...' })
    const prompt = this.form.value.prompt as string;
    this.imageAiService.sendPrompt(prompt).subscribe({
      next: (response: any) => {
        const post: Post = {
          prompt,
          images: response.images,
          name: this.form.value.name as string
        }

        this.showPostdetails(post, true); // se pasa true para que aparexca el boton 'publicar'
        this.utilsService.dismissLoading();
      }, error: (error) => {
        
        this.utilsService.dismissLoading();
        this.utilsService.presetToast({
          message: 'Ocurrio un error...',
          color: 'danger',
          duration: 2000,
          icon: 'alert-circle-outline',
          position: 'top'
        })
      }
    });
  }

  randonPrompt() {
    let randonIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    let randomElement = surpriseMePrompts[randonIndex];
    this.form.get('prompt').setValue(randomElement)
  }

  async showPostdetails(post: Post, isNew?: boolean) {
    await this.utilsService.presentModal({
      component: PostDetailsComponent,
      componentProps: { post, isNew },
      cssClass: 'modal-full-size'
    })
  }

}
