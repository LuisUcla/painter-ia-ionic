import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { surpriseMePrompts } from '../../../assets/data/surprise-promts';
import { Post } from '../../models/post.model';
import { Posts } from '../../../assets/data/images';
import { UtilsService } from '../../services/utils.service';
import { PostDetailsComponent } from '../../shared/templates/post-details/post-details.component';

@Component({
  selector: 'app-create-image',
  templateUrl: './create-image.page.html',
  styleUrls: ['./create-image.page.scss'],
})
export class CreateImagePage implements OnInit {

  form: FormGroup;
  userPosts: Post[] = []

  constructor(private builder: FormBuilder, private utilsService: UtilsService) { 
    this.form = this.builder.group({
      name: ['', Validators.required],
      prompt: ['', Validators.required]
    })
  }

  

  ngOnInit() {
    this.userPosts = Posts;
  }

  submit() {
    console.log(this.form.value)
  }

  randonPrompt() {
    let randonIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    let randomElement = surpriseMePrompts[randonIndex];
    this.form.get('prompt').setValue(randomElement)
  }

  async showPostdetails(post: Post) {
    await this.utilsService.presentModal({
      component: PostDetailsComponent,
      componentProps: { post },
      cssClass: 'modal-full-size'
    })
  }

}
