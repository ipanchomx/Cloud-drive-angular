import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn:boolean = false;

  constructor(private authService: AuthService, private router: Router, private sessionService: SessionService, private googleAuthService: SocialAuthService) { 

    this.authService.loginStatus.subscribe(status=>{
      this.isLoggedIn = status;
    });

  }

  ngOnInit(): void {
  }

  logout() {
    this.sessionService.logout()
    .then((res)=>{
      this.googleAuthService.signOut(true);
      this.authService.clear();
      this.router.navigate(['/home']);
    })
    .catch(console.log)
  }

}
