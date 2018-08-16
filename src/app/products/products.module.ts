import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ProductsTableComponent} from './products-table/products-table.component';
import {PostItemComponent} from './components/post-item/post-item.component';
import {PostDetailComponent} from './post-detail/post-detail.component';
import {CommentsComponent} from './components/comments/comments.component';
import {CommentItemComponent} from './components/comment-item/comment-item.component';
import {ProductsRoutingModule} from './products-routing.module';
import {CdkTableModule} from '@angular/cdk/table';
import {ProductsService} from './products.service';

@NgModule({
  imports: [CommonModule, ProductsRoutingModule, CdkTableModule],
  declarations: [
    ProductsTableComponent,
    PostItemComponent,
    PostDetailComponent,
    CommentsComponent,
    CommentItemComponent
  ],
  providers: [
    ProductsService,
  ],
  exports: [ProductsTableComponent, PostDetailComponent]
})
export class ProductsModule {
}
