import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn:boolean = false;

  constructor(private authService: AuthService, private router: Router) { 

    this.authService.loginStatus.subscribe(status=>{
      this.isLoggedIn = status;
    });

  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.clear();
    this.router.navigate(['/home']);
  }

}
