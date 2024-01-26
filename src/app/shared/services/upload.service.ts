// upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private uploadUrl = 'https://api-assignment-sigma.vercel.app/api/db-angular-project/';
  imageUrl: string | ArrayBuffer | null | undefined;

  constructor(private http: HttpClient) {}

  uploadImage(description: string, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('description', description);
    formData.append('image', image);

    return this.http.post(this.uploadUrl + '/images/add', formData);
  }

  // getImageByPath(imagePath: string): Observable<any> {
  //   return this.http.get(`${this.uploadUrl}?imagePath=${imagePath}`);
  // }

  getImageByPath(imagePath: string): Observable<Blob> {
    return this.http.get(`${this.uploadUrl}/image?imagePath=${imagePath}`, {
      responseType: 'blob'
    });
  }
}