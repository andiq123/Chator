import { environment } from 'src/environments/environment';

export class User {
  id?: string;
  userName?: string;
  photoUrl?: string;
  description?: string;
  isOnline?: boolean = false;
  unreaMessages: number = 0;

  getPhotoUrl(): string {
    if (this.photoUrl) {
      return environment.baseUrl.split('api')[0] + 'images/' + this.photoUrl;
    }
    return 'assets/defaultProfile.png';
  }
}
