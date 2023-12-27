// image-upload.component.ts
import { Component } from '@angular/core';
import { UploadService } from '../../shared/services/upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent {
  description = '';
  image: File | null = null;

  constructor(private uploadService: UploadService) {}

  handleImageChange(event: any): void {
    this.image = event.target.files[0];
  }

  handleSubmit(): void {
    if (this.image) {
      this.uploadService.uploadImage(this.description, this.image).subscribe(
        (response) => {
          console.log('Image téléchargée avec succès', response);
        },
        (error) => {
          console.error('Erreur lors du téléchargement de l\'image', error);
        }
      );
    }
  }
}

