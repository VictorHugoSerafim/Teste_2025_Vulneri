import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})

export class Navbar {
  constructor(public authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}