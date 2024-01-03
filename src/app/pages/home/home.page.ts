import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { Posts } from '../../../assets/data/data/images';
import { UtilsService } from '../../services/utils.service';
import { PostDetailsComponent } from '../../shared/templates/post-details/post-details.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  post: Post[] = [];
  loading: boolean = true;

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
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
    this.post = [];
    setTimeout(() => {
      this.loading = false;
      this.post = Posts;      
    }, 2000);
  }

  async showPostdetails(post: Post) {
    await this.utilsService.presentModal({
      component: PostDetailsComponent,
      componentProps: { post },
      // cssClass: 'modal-full-size'
    })
  }

}
