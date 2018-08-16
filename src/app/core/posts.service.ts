import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiUrls } from './api-urls';
import { Post } from './models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private api: HttpClient) {}

  list(page = 1, perPage = 10) {
    const params = {
      _limit: perPage.toString(),
      _page: page.toString(),
      _expand: 'user'
    };
    return this.api
      .get<Post[]>(ApiUrls.posts, { params, observe: 'response' })
      .pipe(
        map(v => {
          return {
            data: v.body,
            total: +v.headers.get('X-Total-Count'),
            page,
            perPage
          };
        })
      );
  }

  detail(id) {
    return this.api.get<Post>(`${ApiUrls.posts}/${id}`, {
      params: {
        _expand: 'user',
        _embed: 'comments'
      }
    });
  }
}
