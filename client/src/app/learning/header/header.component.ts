import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router, private authService: AuthService) { }

  public navigateTo(url: string): void {
    this.router.navigate([url]);
  }

  public logOut(): void {
    this.authService.logOut();
  }
}
