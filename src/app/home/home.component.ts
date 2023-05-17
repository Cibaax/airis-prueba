import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor() {
    console.log(environment.production); // false (ambiente de desarrollo)
    console.log(environment.apiUrl); // 'http://localhost:3000/api' (ambiente de desarrollo)
    console.log(environment.apiKey); // 'your-dev-api-key' (ambiente de desarrollo)
  }
}
