import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Posts } from '../../../assets/data/images';
import { UtilsService } from '../../services/utils.service';
import { PostDetailsComponent } from '../../shared/templates/post-details/post-details.component';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  post: Post[] = [];
  loading: boolean = true;

  constructor(
    private utilsService: UtilsService,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.getPost();
  }
  
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getPost();

      event.target.complete();
    }, 2000);
  }

  getPost() {
    this.loading = true;
    this.post = Posts;
    this.loading = false;
    

    // this.postsService.getPosts().subscribe({
    //   next: (response: any) => {
    //     this.post = response.data
    //     this.loading = false;
    //   }, error: (error: any) => {
    //     console.log(error)
    //     this.loading = false;
    //   }
    // });
  }

  async showPostdetails(post: Post) {
    await this.utilsService.presentModal({
      component: PostDetailsComponent,
      componentProps: { post, isNew: true },
      cssClass: 'modal-full-size'
    })
  }

}
