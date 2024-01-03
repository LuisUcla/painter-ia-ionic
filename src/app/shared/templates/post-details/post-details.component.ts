import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss'],
})
export class PostDetailsComponent  implements OnInit {

  @Input() post: Post;
  @Input() isNew: boolean;

  selectedImage: string = '';

  constructor() { }

  ngOnInit() {
    this.selectedImage = this.post.images[0];
  }

}
