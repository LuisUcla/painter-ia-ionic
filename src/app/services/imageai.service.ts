import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageaiService {

  constructor(private Http: HttpClient) { }

  sendPrompt(prompt: string) {
    return this.Http.post(environment.baseUrl + environment.imageai, { prompt })
  }
}
