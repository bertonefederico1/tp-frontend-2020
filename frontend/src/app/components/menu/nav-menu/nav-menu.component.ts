import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(
    private router: Router
  ) { }

  logout(){
    if(confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    };
  }

}
