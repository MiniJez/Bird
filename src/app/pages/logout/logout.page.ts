import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/Authentication-service/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  async logout() {
    await this.auth.logoutUser();
    this.router.navigateByUrl('/login');
  }
}
