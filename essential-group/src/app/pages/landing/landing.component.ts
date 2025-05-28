import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

import { faEnvelope, faHouse, faLaptop, faGlobe, faCar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing',
  imports: [FontAwesomeModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  faInstagram = faInstagram;
  faYoutube = faYoutube;
  faEnvelope = faEnvelope;
  faHouse = faHouse;
  faLaptop = faLaptop;
  faGlobe = faGlobe;
  faCar = faCar;
}
