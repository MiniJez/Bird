import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/Authentication-service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerRejected: boolean;
  error: string;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.registerRejected = false;
  }

  ngOnInit() {
  }

  async register(form) {
    let response: Promise<any>;

    if (form.value.password !== form.value.confirm) {
      this.error = 'Error: password and confirm password are differents';
      this.registerRejected = true;
    } else {
      response = this.auth.registerUser(form.value);

      response.then((success) => {
        this.router.navigateByUrl('/home');
      }).catch((error) => {
        this.error = error;
        this.registerRejected = true;
      });
    }
  }

}
