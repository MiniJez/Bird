import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/Authentication-service/authentication.service';
import { LocalStorageService } from '../../services/localStorage-service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginRejected: boolean;
  error: string;
  rememberMe = false;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private localStrServ: LocalStorageService
  ) {
  }

  ngOnInit() {
    this.loginRejected = false;
    if (this.localStrServ.isRememberMeActive()) {
      this.auth.setUid(this.localStrServ.getUid());
      this.router.navigateByUrl('/menu/playlist');
    }
  }

  async login(form) {
    let response: Promise<any>;
    response = this.auth.loginUser(form.value);
    console.log(form.value.remember);
    response.then((success) => {
      console.log(success);
      this.router.navigateByUrl('/menu/playlist');
    }).catch((error) => {
      this.error = error;
      this.loginRejected = true;
    });
  }

}
